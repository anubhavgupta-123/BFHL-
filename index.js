const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = process.env.OFFICIAL_EMAIL;


function fibonacci(n) {
  let a = 0, b = 1;
  const res = [];
  for (let i = 0; i < n; i++) {
    res.push(a);
    [a, b] = [b, a + b];
  }
  return res;
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function hcf(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

function lcm(arr) {
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
}


app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});


app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

    if (!body || typeof body !== "object") {
      return res.status(400).json({ is_success: false });
    }

    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({ is_success: false });
    }

    const key = keys[0];
    let result;

    if (key === "fibonacci") {
      const n = body.fibonacci;

      if (!Number.isInteger(n) || n < 0) {
        return res.status(400).json({ is_success: false });
      }

      result = fibonacci(n);
    }

    else if (key === "prime") {
      const arr = body.prime;

      if (
        !Array.isArray(arr) ||
        arr.length === 0 ||
        !arr.every(n => Number.isInteger(n))
      ) {
        return res.status(400).json({ is_success: false });
      }

      result = arr.filter(isPrime);
    }

    else if (key === "hcf") {
      const arr = body.hcf;

      if (
        !Array.isArray(arr) ||
        arr.length === 0 ||
        !arr.every(n => Number.isInteger(n))
      ) {
        return res.status(400).json({ is_success: false });
      }

      result = hcf(arr);
    }

    else if (key === "lcm") {
      const arr = body.lcm;

      if (
        !Array.isArray(arr) ||
        arr.length === 0 ||
        !arr.every(n => Number.isInteger(n)) ||
        arr.some(n => n === 0)
      ) {
        return res.status(400).json({ is_success: false });
      }

      result = lcm(arr);
    }

    else if (key === "AI") {
      const question = body.AI;

      if (typeof question !== "string" || question.trim() === "") {
        return res.status(400).json({ is_success: false });
      }

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Answer in ONE WORD only.\nQuestion: ${question}`
                }
              ]
            }
          ]
        },
        { timeout: 5000 }
      );

      const aiText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiText) {
        return res.status(500).json({ is_success: false });
      }

      result = aiText.trim();
    }

    else {
      return res.status(400).json({ is_success: false });
    }
    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: result
    });

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);

    res.status(500).json({
      is_success: false,
      error: err.response?.data || err.message
    });
  }
});

/* ---------- SERVER ---------- */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
