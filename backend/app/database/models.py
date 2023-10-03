from typing import Optional

from sqlmodel import Field, SQLModel


# We using "table=True" to tell SQLModel that this is a table model, it represent table.
class tasks(SQLModel, table=True):
    task_id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(min_length=3, max_length=100)
    description: str = Field(min_length=10, max_length=1000)
    completed: bool
    # user_id: int = Field(default=None, foreign_key=True)


# class users(SQLModel, table=True):
#     # user_id: int = Field(default=None, primary_key=True)
