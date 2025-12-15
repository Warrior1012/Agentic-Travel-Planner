
# 🌍 Agentic Travel Planner

*A Multimodal AI Travel Planning Application powered by Google Gemini*

🔗 **GitHub Repository:**
[https://github.com/Warrior1012/Agentic-Travel-Planner](https://github.com/Warrior1012/Agentic-Travel-Planner)

---

## 🚀 Overview

**Agentic Travel Planner** is a multimodal AI application that generates a **personalized 4-day travel itinerary** using a **single user prompt and an inspiration image**.

The system demonstrates **agentic behavior** by:

* Reasoning over **text + image inputs**
* Generating a **structured travel plan**
* Triggering a mocked downstream action (itinerary save)

The core intelligence is powered by **Google’s Gemini API**, showcasing multimodal reasoning, structured output handling, and real-world AI workflow design.

---

## 🧠 Key Features

* 🖼️ **Multimodal Input**
  Users provide:

  * A natural language travel prompt
  * An inspiration image (visual context)

* 🤖 **AI-Generated Structured Itinerary**

  * 4-day travel plan
  * Day-wise activities
  * Time-based scheduling
  * Context influenced by the uploaded image

* 🔁 **Agentic Workflow (Mocked)**

  * After generation, the itinerary is “saved” via a mocked function
  * Demonstrates how AI agents can trigger downstream actions

* ⚡ **Single API Call Optimization**

  * Designed to be free-tier friendly
  * Minimal requests with maximum reasoning value

---

## 🏗️ Tech Stack

### Backend

* Node.js
* Express.js
* Google Gemini API (`gemini-2.5-flash`)
* dotenv
* CORS

### Frontend

* HTML
* CSS
* Vanilla JavaScript
* Live Server (for local development)

---

## 🧩 Architecture Overview

```
Frontend (HTML/CSS/JS)
        |
        |  POST /process-travel
        |  (prompt + image as Base64)
        ↓
Backend (Node + Express)
        |
        |  Gemini Multimodal Reasoning
        |  (Text + Image)
        ↓
Structured Travel Itinerary (JSON)
        |
        ↓
Frontend Rendering (Day-wise UI)
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Warrior1012/Agentic-Travel-Planner.git
cd Agentic-Travel-Planner
```

---

### 2️⃣ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
CLIENT_API_KEY=hackathon-secret-2024
PORT=3000
```

Start the backend server:

```bash
node index.js
```

You should see:

```
🚀 Server running on http://localhost:3000
```

---

### 3️⃣ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Open `index.html` using **Live Server** in VS Code:

* Right-click `index.html`
* Select **“Open with Live Server”**

Frontend will run at:

```
http://127.0.0.1:5500
```

---

## 🔐 API Key Usage Disclaimer 
⚠️ **Important Security Notice**

* The **Gemini API key** is required **only on the backend**
* **Never expose your Gemini API key on the frontend**
* The frontend communicates with the backend using a **mock client API key** (`x-api-key`) for demo purposes

```http
x-api-key: hackathon-secret-2024
```

> In a production system, this authentication layer should be replaced with secure user-based authentication and secret management.

---

## 🎯 Hackathon Alignment

This project aligns with **GenAI Frontiers: App Development using the Gemini API** under:

### ✅ Theme 1: Multimodal Function Calling & Automation

* Multimodal input (text + image)
* Agentic reasoning
* Structured output
* Mocked downstream function execution

### Why Gemini?

* Gemini’s multimodal reasoning enables the system to **interpret visual aesthetics**
* Single-call reasoning ensures **free-tier optimization**
* Demonstrates real-world AI agent workflows

---

## 📸 Example Use Case

1. User prompt:

   > *“Plan a 4-day trip to France with a romantic vibe”*

2. User uploads an image (e.g., Eiffel Tower at sunset)

3. Gemini:

   * Analyzes image aesthetics
   * Reasons over user intent
   * Generates a Paris-centric itinerary

4. Frontend renders a day-wise travel plan dynamically

---

## 🏁 Conclusion

**Agentic Travel Planner** demonstrates how modern GenAI systems can:

* Reason multimodally
* Produce structured, usable outputs
* Act as intelligent agents within a workflow

This project emphasizes **clarity of Gemini integration**, **real-world applicability**, and **resource-efficient AI design**.

---

