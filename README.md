# Superhero App

A comprehensive web application to browse superheroes, view detailed profiles, manage favorites, and build recommended teams using the Superhero API.

##  Tech Stack

### Backend
- **Node.js** + Express
- **PostgreSQL** Database
- **Prisma** ORM

### Frontend
- **React** - Core JavaScript library
- **Material-UI (MUI)** - Component library for modern UI
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **localStorage** - Client-side caching


## 🗄️ Database Setup

### 1. Install Dependencies

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init

2. Configure Database URL
DATABASE_URL="postgresql://postgres:Jeet%40%23%24%25105520@localhost:5432/superhero?schema=public"

3. Run Migrations
npx prisma migrate dev --name init

📊 Database Schema
model User {
  id Int @id @default(autoincrement())
  name String
  email String @unique
  password String
  role String // "user" | "admin"
  favourites Favourite[]
}

model Superhero {
  id        Int      @id @default(autoincrement())
  apiId     Int      @unique
  name      String
  alignment String?
  intelligence String?
  strength    String?
  speed       String?
  durability  String?
  power       String?
  combat      String?
  imageUrl    String?

  favourites Favourite[]
}

model Favourite {
  id Int @id @default(autoincrement())
  userId Int
  superheroId Int
  user User @relation(fields: [userId], references: [id])
  superhero Superhero @relation(fields: [superheroId], references: [id])
}

✨ Frontend Features
Core Functionality

🦸 Superhero Browser - Browse comprehensive superhero database
📋 Detailed Profiles - Complete hero breakdown with biography, stats, and appearance
⭐ Favorites Management - Add/remove heroes from personal favorites (persisted)
👥 Team Recommendations - AI-powered team suggestions based on hero attributes
🔧 Admin Panel - Protected route for updating superhero information

Component Architecture

Navbar - Navigation and user authentication
SuperheroCard - Hero preview cards with key information
FavoritesList - Dedicated favorites management interface
AdminPanel - Administrative controls for data management

🐳 Docker Setup & Deployment
1. Docker Configuration Files
Ensure these files exist in your project:

docker-compose.yml
backend/Dockerfile
frontend/Dockerfile

2. Docker Compose Configuration
version: '3.8'

services:
  db:
    image: postgres:15
    container_name: superhero-db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: "yourpassword"
      POSTGRES_DB: superhero
    ports:
      - "5432:5432"
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    container_name: superhero-backend
    restart: always
    ports:
      - "4000:4000"
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: "postgresql://postgres:password@db:5432/superhero?schema=public"

  frontend:
    build: ./frontend
    container_name: superhero-frontend
    restart: always
    ports:
      - "5173:80"
    depends_on:
      - backend

volumes:
  db-data:

3. Running the Application
Initial Database Setup
# Start database container first
docker compose up -d db

# Verify database is running
docker ps

Full Application Launch
docker compose up --build

Access Points

Backend API: http://localhost:4000
Frontend Application: http://localhost:5173


4. Managing the Application
Stop Services
bashdocker compose down
Reset Database (Optional)
bash# Remove volumes to reset database
docker compose down -v

##Getting Started
Clone the repository
Set up environment variables using .env.example as template
Run with Docker: docker compose up --build
Access the application at http://localhost:5173