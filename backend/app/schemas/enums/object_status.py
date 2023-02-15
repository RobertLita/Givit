from enum import Enum


class ObjectStatus(str, Enum):
    reserved = "RESERVED"
    donated = "DONATED"
    available = "AVAILABLE"
