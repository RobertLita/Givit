import datetime
from sqlalchemy import or_, and_

from sqlalchemy.orm import Session
from app.models.message import Message


def create_message(db: Session, senderId: int, recipientId: int, content: str) -> Message:
    db_message = Message(
        senderId=senderId,
        recipientId=recipientId,
        content=content,
        timestamp=datetime.datetime.now()
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def get_all_messages(db: Session, user_id_1: int, user_id_2: int) -> [Message]:
    return db.query(Message).filter(
        or_(
            and_(Message.senderId == user_id_1, Message.recipientId == user_id_2),
            and_(Message.senderId == user_id_2, Message.recipientId == user_id_1)
        )
    ).all()


def get_chatters(db: Session, user_id: int):
    result = db.query(Message.recipientId).filter(Message.senderId == user_id).distinct().all()
    chatters = [row[0] for row in result]
    return chatters
