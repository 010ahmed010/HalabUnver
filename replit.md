# HalabUnver - Unified Academic Ecosystem

## Overview
HalabUnver is a system design and architecture project for a unified academic and commercial ecosystem for Aleppo University students. The repository contains detailed specification files (`.desc`) and a React frontend landing page.

## Project Structure
```
/
├── client/               # React 19 + Vite frontend
│   ├── src/
│   │   ├── App.jsx       # Main landing page component
│   │   ├── App.css       # HalabUnver dark theme styles
│   │   └── index.css     # Global reset styles
│   ├── vite.config.js    # Vite config (port 5000, host 0.0.0.0)
│   └── package.json
├── HalabUnver-SystemDesign/   # System architecture documentation
│   ├── HalabUnver_DescriptionMirrorMethod/  # .desc specification files
│   │   ├── RULES.desc    # System manifesto and tech stack rules
│   │   ├── home/         # Home page specs
│   │   ├── halabAcademy/ # Academy module specs
│   │   ├── halabLibrary/ # Library module specs
│   │   ├── halabFreelance/ # Freelance marketplace specs
│   │   ├── halabStore/   # Hardware store specs
│   │   ├── adminDashboard/ # Admin panel specs
│   │   └── studenDashboard/ # Student dashboard specs
│   └── VisulizedSystemDesign/ # Architecture diagrams
└── HalabUnver_DMM_archiveFile.tar  # Archive of system design files
```

## Tech Stack (Planned MERN)
- **Frontend:** React 19 + Vite 8 (Rolldown engine)
- **Backend:** Node.js + Express.js (planned, not yet implemented)
- **Database:** MongoDB + Mongoose (planned, not yet implemented)
- **Styling:** Custom CSS with HalabUnver dark theme (#121212 bg, #BB86FC accent)

## Running the App
The frontend runs on port 5000 via the "Start application" workflow:
```bash
cd client && npm run dev
```

## Design Theme
- Background: `#121212` (Deep Charcoal)
- Accent: `#BB86FC` (Vibrant Purple)
- Surface: `#1E1E1E`
- Text: `#E0E0E0`
- 90-degree grid design, scientific/academic aesthetic

## Key Architecture Rules (from RULES.desc)
- Frontend in `/client`, Backend in `/server` (strict separation)
- XP gamification system for student actions
- Escrow-based freelance payments
- JWT stateless authentication
- Status pills: Pending, Verified, Processing, Ready, Success
