from enum import Enum


class UserType(str, Enum):
    donor = "DONOR"
    organization = "ORGANIZATION"
