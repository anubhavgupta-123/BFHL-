# Qualifier 1 | Chitkara University 2026 | Class of 2027

## Date - 10 Feb 2 026

Total Time – 120 minutes

IMPORTANT — READ CAREFULLY

Each of the following carries marks independently:

- Strict API response structure
- Correct HTTP status codes
- Robust input validation
- Graceful error handling (no crashes)
- Security guardrails
- Public accessibility of APIs

Hidden test cases will evaluate:

- Error codes
- Boundary conditions
- Security edge cases
- Structure consistency

## Objective

Develop and host two REST APIs:

POST /bfhl
GET /health

## Allowed Tech Stack

You may implement the APIs using:

- Node.js
- Java
- Python


Any framework is acceptable.

## POST /bfhl — Functional Keys

Each request will contain exactly one of: fibonacci, prime, lcm, hcf, AI

## Logic Mapping

Key Input Output

fibonacci Integer Fibonacci series

prime Integer array Prime numbers

lcm Integer array LCM value

hcf Integer array HCF value

AI Question string Single-word AI response

## Mandatory Response Structure

All successful POST responses must contain:

{
"is_success": true,
"official_email": "YOUR CHITKARA EMAIL",
"data": ...
}

Errors must return appropriate HTTP status codes and is_success = false.

## Request and Response Examples

Request:
{
"fibonacci": 7
}

Response:
{
"is_success": true,
"official_email": "YOUR CHITKARA EMAIL",
"data": [0,1,1,2,3,5,8]
}


Request:
{
"prime": [2,4,7,9,11]
}

Response:
{
"is_success": true,
"official_email": "YOUR CHITKARA EMAIL",
"data": [2,7,11]
}

Request:
{
"lcm": [12,18,24]
}

Response:
{
"is_success": true,
"official_email": "YOUR CHITKARA EMAIL",
"data": 72
}

Request:
{
"hcf": [24,36,60]
}

Response:
{
"is_success": true,
"official_email": "YOUR CHITKARA EMAIL",
"data": 12
}

Request:
{
"AI": "What is the capital city of Maharashtra?"
}

Response:
{
"is_success": true,
"official_email": "YOUR CHITKARA EMAIL",


"data": "Mumbai"
}

## GET /health Example

{
"is_success": true,
"official_email": "YOUR CHITKARA EMAIL"
}

## AI Integration

You must integrate an external AI API such as Google Gemini, OpenAI, or Anthropic.

## Steps to Acquire Google Gemini Free API Key

1. Visit https://aistudio.google.com
2. Sign in with Google account
3. Click Get API Key
4. Create API key in project
5. Copy the key

## GitHub Repository Guidelines

- Repository must be public
- Must contain full source code
- Share GitHub repository URL along with deployed API links

## Deployment Steps (Add After Development)

Vercel:

1. Login → New Project → Import repository
2. Configure runtime
3. Deploy and copy public URL

Railway:

1. New Project → Deploy from GitHub
2. Select repository
3. Configure variables
4. Deploy and copy URL

Render:

1. New Web Service → Select repository
2. Choose runtime
3. Set build & start commands
4. Deploy and copy URL


ngrok may be used temporarily for testing. URLs expire and require the local server to
remain running.

## Final Notes

Structure, robustness, and production readiness are key evaluation factors.


