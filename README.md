# 🍉 First Love Memory Manipulator

A pixel-art idle game where players earn coins by clicking floating watermelons, purchase upgrades, and decorate a cozy band room — all enhanced with music, animations, and visual effects. Inspired by the kdrama Twinkling Watermelon.

---

## ✨ Features

- Click-to-Earn Gameplay: Click floating watermelons to earn bonus coins for active gameplay bonus.
- Automatic Coin Generation: Incrementing watermelon count for passive gameplay.
- Shop & Upgrades: Purchase decorative and interactive items to customize the room, creating visible progression.
- Audio Experience: Background music with controls powered by Howler.js (and the Kdrama soundtrack album).
- Visual Feedback: Sparkles, animations, and custom pixel-art cursors for satisfying interactions.
- Persistent Progress: Player state and inventory are managed through a Spring Boot backend.

---

## 🚧 In Progress

- More Room Items: Additional decorations and interactive objects.
- Visual Polish: More animations and particle effects.
- Database: Integrating PostgreSQL for reliable data persistency and player's authentication

---

## 🚀 Run Locally

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher)
- Java 21
- Maven

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend

2. Build and run the Spring Boot server:
   ```bash
   mvn clean install  
   mvn spring-boot:run

The backend will start at:
http://localhost:8080

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend

2. Install dependencies and start the development server:
   ```bash
   npm install  
   npm run dev

The frontend will be available at:
http://localhost:5173

---

## 🛠️ Tech Stack

Frontend:
- React
- Tailwind CSS
- Axios
- Vite

Backend:
- Java
- Spring Boot
- Maven
- RESTful API

Audio:
- Howler.js

---

## 📬 Author

This is a personal project created by Chuc An Trinh.  
trchan@student.ubc.ca  
https://www.linkedin.com/in/an-trinh-891462332/ (LinkedIn)
