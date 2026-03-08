from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///devcard.db")

Base = declarative_base()

class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    university = Column(String)
    major = Column(String)
    year = Column(String)
    email = Column(String)
    github = Column(String)
    linkedin = Column(String)
    portfolio = Column(String)
    skills = Column(String)

Base.metadata.create_all(engine)

SessionLocal = sessionmaker(bind=engine)