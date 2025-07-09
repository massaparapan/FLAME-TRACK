from sqlalchemy import JSON, Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(45), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)

class Plan(Base): 
    __tablename__ = "plans"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(45), unique=True, index=True, nullable=False)
    description = Column(String(255), unique=True, index=True, nullable=False)
    price = Column(String(45), nullable=False)
    features = Column(JSON, nullable=True)
    dashboard_id = Column(String(255), nullable=False)

