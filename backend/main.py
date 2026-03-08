from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal, Card

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://dev-card-production.up.railway.app", "https://dev-card-f3q5.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class CardData(BaseModel):
    name: str
    university: str
    major: str
    year: str
    email: str
    github: str
    linkedin: str
    portfolio: str
    skills: list

@app.get("/")
def home():
    return {"message": "devcard api is running"}

@app.post("/save-card")
def save_card(data: CardData):
    db = SessionLocal()

    card = Card(
        name=data.name,
        university=data.university,
        major=data.major,
        year=data.year,
        email=data.email,
        github=data.github,
        linkedin=data.linkedin,
        portfolio=data.portfolio,
        skills=str(data.skills)
    )

    db.add(card)
    db.commit()
    db.close()

    username = data.name.lower().replace(" ", "")
    return {"url": username}

@app.get("/card/{username}")
def get_card(username: str):
    db = SessionLocal()
    card = db.query(Card).filter(Card.name.ilike(username)).first()
    db.close()

    if card is None:
        return {"error": "card not found"}

    return card