# BFHL API — Chitkara Qualifier 1

REST API with two endpoints: `POST /bfhl` and `GET /health`.

## Setup

```bash
npm install
cp .env.example .env   # Add your GEMINI_API_KEY
npm run dev             # Development
npm start               # Production
```

## Endpoints

### GET /health
Returns API health status.

### POST /bfhl
Accepts one operation per request:

| Key | Input | Output |
|-----|-------|--------|
| `fibonacci` | Integer | Fibonacci series of length n |
| `prime` | Integer array | Filtered prime numbers |
| `lcm` | Integer array | LCM of all values |
| `hcf` | Integer array | HCF/GCD of all values |
| `AI` | Question string | Single-word AI answer |

## Tech Stack
- Node.js + Express
- Google Gemini API (for AI queries)
- Deployed on Railway
