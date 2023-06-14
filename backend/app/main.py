from fastapi import FastAPI, Depends
from fastapi import WebSocket, WebSocketDisconnect
from app.core.config import settings
from app.api.api_v1.api import api_router
from fastapi.middleware.cors import CORSMiddleware
from app.crud.crud_message import create_message, get_all_messages
from app.api import deps
from sqlalchemy.orm import Session

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str, sender: int, receiver: int, db: Session):
        for connection in self.active_connections:
            await connection.send_text(message)
        create_message(db, sender, receiver, message.split(':')[1])


manager = ConnectionManager()


@app.websocket("/ws/{sender}/{receiver}")
async def websocket_endpoint(websocket: WebSocket, sender: int, receiver: int,  db: Session = Depends(deps.get_db)):
    await manager.connect(websocket)
    messages = get_all_messages(db, sender, receiver)
    for message in messages:
        history_message = f"{message.senderId}:{message.content}"
        await manager.send_personal_message(history_message, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f"{sender}:{data}", sender, receiver, db)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


app.include_router(api_router)
