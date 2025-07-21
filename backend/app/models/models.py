from sqlalchemy import JSON, Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

user_devices = Table(
    'user_devices',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('device_id', Integer, ForeignKey('devices.id'), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(45), unique=True, index=True, nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)
    
    plan_id = Column(Integer, ForeignKey("plans.id"), nullable=False)
    
    plan = relationship("Plan", back_populates="users")
 
    devices = relationship("Device", secondary=user_devices, back_populates="users")

class Plan(Base):
    __tablename__ = "plans"
   
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(45), nullable=False)
    description = Column(String(255), nullable=True)
    price = Column(String(45), nullable=False)
    features = Column(JSON, nullable=True)
    dashboard_id = Column(String(255), nullable=False)

    users = relationship("User", back_populates="plan")

class Device(Base):
    __tablename__ = "devices"
   
    id = Column(Integer, primary_key=True, index=True)
    access_token = Column(String(255), unique=True, nullable=False)
   
    users = relationship("User", secondary=user_devices, back_populates="devices")