# WeRent

Lightweight car-rental platform. This repository contains a React + Vite frontend and an Express + MongoDB backend that together provide a peer-to-peer car listing and booking experience.


## Key features

- User registration & login (JWT)
- Owners can list cars with images and manage availability
- Search available cars by location and dates
- Create bookings, owners can accept or reject
- Simple owner dashboard with stats

## Tech stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB Atlas (mongoose)
- Auth: JSON Web Tokens (JWT)
- Image uploads: ImageKit (used in controllers)

## Quick start

Requirements: Node.js, npm, MongoDB (or connection string)

1) Backend

```powershell
cd BackEnd
npm install
# create a .env file with MONGODB_URI and JWT_SECRET
node server.js
```

2) Frontend

```powershell
cd FrontEnd
npm install
npm run dev
```

## Where to find docs

- Backend API documentation: `BackEnd/README.md`
- Frontend documentation and usage: `FrontEnd/README.md`

## Contributing

Any contributions are welcome. Open a PR and include a short description and quick test steps.

## Connect With Me
**LinkedIn:** https://www.linkedin.com/in/devadi/ 
**GitHub:** https://github.com/ADI-2707
