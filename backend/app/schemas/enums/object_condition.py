from enum import Enum


class ObjectCondition(str, Enum):
    new = "NEW"
    veryGood = "VERY GOOD"
    good = "GOOD"
    acceptable = "ACCEPTABLE"
