<div align="center">

<br/>

```
██████╗ ██╗         ███████╗████████╗ █████╗ ████████╗███████╗    ██╗  ██╗██╗   ██╗██████╗
██╔══██╗██║         ██╔════╝╚══██╔══╝██╔══██╗╚══██╔══╝██╔════╝    ██║  ██║██║   ██║██╔══██╗
██████╔╝██║         ███████╗   ██║   ███████║   ██║   ███████╗    ███████║██║   ██║██████╔╝
██╔═══╝ ██║         ╚════██║   ██║   ██╔══██║   ██║   ╚════██║    ██╔══██║██║   ██║██╔══██╗
██║     ███████╗    ███████║   ██║   ██║  ██║   ██║   ███████║    ██║  ██║╚██████╔╝██████╔╝
╚═╝     ╚══════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝   ╚═╝   ╚══════╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝
```

### Unofficial Premier League data platform — player stats, fixtures, tables and results.

<br/>

[![Python](https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-REST%20API-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![Frontend](https://img.shields.io/badge/Frontend-Included-61DAFB?style=flat-square&logo=react&logoColor=black)](./frontend)
[![Status](https://img.shields.io/badge/Status-Active%20Development-22c55e?style=flat-square)](.)
[![License](https://img.shields.io/badge/License-Educational-6b7280?style=flat-square)](./LICENSE)

<br/>

> ⚠️ **Disclaimer:** This is an unofficial, independent project. Not affiliated with, endorsed by, or connected to the Premier League, its clubs, or any official partners.

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
  - [Player Statistics](#-get-player-statistics)
  - [League Table](#-get-league-table)
  - [Team Fixtures](#-get-team-fixtures)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

**Premier League Stats Hub** is a full-stack educational project that combines a Flask REST API, web scraping, and a modern frontend to make Premier League data accessible, organized, and easy to explore.

The backend fetches data from publicly available Premier League web pages and exposes it through clean, RESTful endpoints. The frontend consumes this API and presents everything through a responsive, user-friendly interface — all within a single monorepo.

Built to practice real-world skills: API design, data scraping, full-stack integration, and project documentation.

---

## Features

| Feature                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| 🧑 **Player Statistics**  | Look up stats for any Premier League player   |
| 📊 **League Table**       | Current standings with full match data        |
| 📅 **Team Fixtures**      | Upcoming fixtures for any team                |
| 🏆 **Match Results**      | Recent results support                        |
| ⚡ **REST API**           | Clean Flask-based API with JSON responses     |
| 🖥️ **Frontend App**       | Included UI that consumes the API             |
| 📁 **Monorepo Structure** | Backend, frontend, and docs in one repository |

---

## Tech Stack

### Backend

- **Python 3.x** — Core language
- **Flask** — Lightweight REST API framework
- **Web Scraping** — Data retrieved from publicly available sources
- **REST Architecture** — Clean and predictable endpoint design

### Frontend

- **Modern Web Framework** — Responsive and component-based
- **API Integration** — Consumes all backend endpoints
- **Responsive Design** — Works across devices

### Documentation

- Detailed endpoint references
- Setup and installation guides
- Usage examples and response schemas

---

## Project Structure

```
premier-league-stats-hub/
│
├── backend/
│   └── api/
│       ├── main.py              # App entry point
│       ├── requirements.txt     # Python dependencies
│       ├── fixtures.py             
│       ├── player_stats.py   
|       ├── table.py     
│       ├── assets/                      
│       └── README.md
│
├── frontend/
│   ├── src/                     # Source code
│   ├── public/                  # Static assets
│   ├── package.json
│   └── README.md
│
├── docs/
│   ├── api.md                   # API documentation
│   ├── endpoints.md             # Endpoint reference
│   └── screenshots/             # UI screenshots
│
├── README.md
├── .gitignore
└── LICENSE
```

| Folder        | Description                                                 |
| ------------- | ----------------------------------------------------------- |
| `backend/api` | Flask API, scraping logic, routes, and backend dependencies |
| `frontend`    | Frontend application that consumes the API                  |
| `docs`        | Documentation, endpoint details, screenshots, and notes     |

---

## API Reference

**Base URL (local development):**

```
http://localhost:5000
```

All endpoints return JSON. Response fields may vary depending on data availability from the scraping source.

---

### 🧑 Get Player Statistics

```http
GET /players/{player_name}
```

Returns information and statistics for a Premier League player.

**Path Parameters:**

| Parameter     | Type     | Description                                                 |
| ------------- | -------- | ----------------------------------------------------------- |
| `player_name` | `string` | Player name as a URL-friendly slug (e.g., `erling-haaland`) |

**Example Request:**

```bash
curl http://localhost:5000/players/erling-haaland
```

**Example Response:**

```json
[
  {
    "name": "Erling Haaland",
    "position": "Forward",
    "club": "Manchester City",
    "nationality": "Norway",
    "date_of_birth": "21/07/2000",
    "height": "194cm",
    "key_stats": {
      "appearances": "82",
      "goals": "91",
      "assists": "18"
    }
  }
]
```

> **Note:** Common name variations may also work depending on the scraping source. Returned fields vary based on data availability.

---

### 📊 Get League Table

```http
GET /table
```

Returns the current Premier League standings with full match statistics.

**Example Request:**

```bash
curl http://localhost:5000/table
```

**Example Response:**

```json
[
  {
    "position": 1,
    "team": "Arsenal",
    "played": 20,
    "wins": 14,
    "draws": 4,
    "losses": 2,
    "goal_difference": 28,
    "points": 46
  },
  {
    "position": 2,
    "team": "Manchester City",
    "played": 20,
    "wins": 13,
    "draws": 5,
    "losses": 2,
    "goal_difference": 25,
    "points": 44
  }
]
```

**Response Fields:**

| Field             | Type      | Description                       |
| ----------------- | --------- | --------------------------------- |
| `position`        | `integer` | Current league position           |
| `team`            | `string`  | Club name                         |
| `played`          | `integer` | Matches played                    |
| `wins`            | `integer` | Total wins                        |
| `draws`           | `integer` | Total draws                       |
| `losses`          | `integer` | Total losses                      |
| `goal_difference` | `integer` | Goals scored minus goals conceded |
| `points`          | `integer` | Total league points               |

---

### 📅 Get Team Fixtures

```http
GET /fixtures/{team_name}
```

Returns upcoming Premier League fixtures for a specific team.

**Path Parameters:**

| Parameter   | Type     | Description                                        |
| ----------- | -------- | -------------------------------------------------- |
| `team_name` | `string` | Team name as a URL-friendly slug (e.g., `chelsea`) |

**Example Request:**

```bash
curl http://localhost:5000/fixtures/chelsea
```

**Example Response:**

```json
[
  {
    "home_team": "Chelsea",
    "away_team": "Liverpool",
    "date": "12/08/2026",
    "time": "16:30"
  },
  {
    "home_team": "Chelsea",
    "away_team": "Tottenham Hotspur",
    "date": "19/08/2026",
    "time": "15:00"
  },
  {
    "home_team": "Manchester United",
    "away_team": "Chelsea",
    "date": "26/08/2026",
    "time": "17:30"
  }
]
```

> **Note:** Returns upcoming fixtures when available. Data depends on the scraping source being up to date.

---

## Getting Started

### Prerequisites

Make sure you have the following installed before proceeding:

- [Python 3.x](https://www.python.org/downloads/)
- [Node.js & npm](https://nodejs.org/)
- [Git](https://git-scm.com/)

---

### Clone the Repository

```bash
git clone https://github.com/renanzdev/premier-league-stats-hub.git
cd premier-league-stats-hub
```

---

### 1. Backend Setup

Navigate to the backend folder:

```bash
cd backend/api
```

Create and activate a virtual environment:

```bash
# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

# Windows
python -m venv .venv
.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the Flask server:

```bash
python main.py
```

The API will be available at: **http://localhost:5000**

---

### 2. Frontend Setup

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at: **http://localhost:5173**

> The port may vary depending on your framework configuration.

---

## Environment Variables

Create a `.env` file inside `backend/api/` with the following variables:

```env
FLASK_ENV=development
FLASK_DEBUG=true
PORT=5000
```

Use `.env.example` to document all required variables. **Never commit sensitive `.env` files to the repository.**

---

## Roadmap

Planned improvements for future versions:

- [ ] Improve response consistency and error formatting
- [ ] Add structured error handling across all endpoints
- [ ] Add match results endpoint
- [ ] Add club details endpoint
- [ ] Add player search with autocomplete suggestions
- [ ] Add frontend dashboard pages with filtering
- [ ] Add loading and error states in the frontend
- [ ] Add response caching to reduce scraping frequency
- [ ] Add full API documentation with Swagger/OpenAPI
- [ ] Add Docker support for easier local setup
- [ ] Add automated tests for API endpoints

---

## A Note on Web Scraping

This project retrieves data from publicly available web pages. Because external sources may change their structure at any time, scrapers may require periodic updates.

**Recommendations for long-term stability:**

- Add response caching (e.g., Redis or simple file cache)
- Set request timeouts and retry logic
- Implement structured fallback responses
- Avoid sending excessive requests to external sources
- Always respect the source website's terms of service

---

## Contributing

Contributions are welcome! To contribute:

1. **Fork** this repository
2. **Create** a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes and commit:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** and describe what you've changed

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## License

This project is available for **educational and non-commercial use only**.

Before using it in any production or commercial environment, review the data source's terms of service and the legal implications of scraping third-party websites.

---

## Author

<div align="center">

**Renan da Silva Rodrigues**

[![GitHub](https://img.shields.io/badge/GitHub-@renanzdev-181717?style=flat-square&logo=github)](https://github.com/renanzdev)

_Built with curiosity, caffeine, and a love for football._

</div>
