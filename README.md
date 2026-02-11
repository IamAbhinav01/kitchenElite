# KitchenELITE

AI-powered kitchen companion: nutrition scanning, recipe generation, and conversational cooking guidance.

Live demo: https://abhinavsunil-kitchenelite-api.hf.space/search?query=paneer

Model training: https://huggingface.co/abhinavsunil/kitchenelite-recipe-model

Space / API: https://huggingface.co/spaces/abhinavsunil/kitchenelite-api/tree/main

---

## Table of Contents

- **Overview**: Project purpose and high-level summary
- **Features**: What the app does
- **Tech Stack**: Key technologies used
- **Quick Start**: How to run Backend and Frontend locally
- **Project Structure**: Short directory map
- **Usage**: How to use main features
- **API**: Quick endpoint reference
- **Contributing**: How to contribute
- **Troubleshooting**: Common fixes
- **License & Acknowledgments**

---

## Overview

KitchenELITE combines modern frontend and backend engineering with advanced AI models to deliver:

- food-image nutrition analysis
- personalized AI recipe generation
- an interactive conversational cooking assistant
- context-aware recipe recommendations (RAG + vector search)

The project integrates a React + Vite frontend with a Python backend (FastAPI + Django) and several ML components (vision + LLMs + vector database).

---

## Features

- **Nutrition Scanning**: Upload images to receive calories, macro- and micronutrients.
- **AI Recipe Generation**: Generate recipes from ingredients or preferences.
- **Conversational Assistant**: Stateful chat for step-by-step cooking help.
- **RAG Recommendations**: Retrieval-augmented recipe suggestions using embeddings.
- **Admin & Data**: Django admin, recipe CSV dataset, and ingestion utilities.

---

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, ESLint
- **Backend**: FastAPI (main API), Django (additional endpoints/admin)
- **AI / Data**: LangChain, Mistral (vision), Groq Llama (conversational), Pinecone (vector DB)
- **Python**: 3.10+ with async support; tooling via `pyproject.toml`

---

## Quick Start

Prerequisites:

- Python 3.10+
- Node.js 18+ and `npm`
- Git
- API keys for Mistral, Groq, and Pinecone (see Environment variables)

Backend (FastAPI + Django)

1. Open a terminal and go to the backend folder:

```bash
cd Backend
```

2. Create and activate a virtual environment:

```bash
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS / Linux:
source venv/bin/activate
```

3. Install Python dependencies (project uses `pyproject.toml`):

```bash
pip install -e .
```

4. Configure environment variables (create `.env` in `Backend`):

```env
MISTRAL_API_KEY=your_mistral_api_key
GROQ_API_KEY=your_groq_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_env
```

5. Run Django migrations (if using Django endpoints):

```bash
cd kitech_elite_server
python manage.py migrate
```

6. Start servers:

FastAPI (default: 8000):

```bash
# from Backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Django (optional, default: 8001):

```bash
python manage.py runserver 8001
```

Frontend (React)

1. In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

2. Open the dev server (usually `http://localhost:5173`).

---

## Project Structure (short)

- [Backend](Backend/) — FastAPI entry (`main.py`), `kitech_elite_server/` (Django project), `IndianHealthyRecipe.csv`
- [Frontend](Frontend/) — React + Vite app, `src/` contains pages and components
- [MODEL_TRAINIG](MODEL_TRAINIG/) — training, embeddings, and inference utilities
- [python_basics](python_basics/) — small Python exercises (separate learning folder)

Refer to the in-repo detailed structure for full file lists.

---

## Usage Guide

1. Start Backend and Frontend as shown above.
2. Open the frontend in your browser.
3. Use the **NutriScan** page to upload food images and receive analysis.
4. Use **Prepare with AI** to chat and generate recipes from ingredients.

Notes:

- Typical analysis latency depends on model provider (5–15s).
- Sessions are persisted to allow follow-up conversation.

---

## API Reference (quick)

- `POST /analyse_image` (FastAPI) — upload image file, returns nutritional JSON
- `POST /api/scan-food-image/` (Django) — alternate scanning endpoint
- `POST /api/prepare-ai/` (Django) — generate recipe from text
- `POST /api/guide-ai/` (Django) — conversational assistant (accepts `session_id`)

(See code in `Backend/kitech_elite_server/` for detailed request/response shapes.)

---

## Environment Variables

- `MISTRAL_API_KEY` — vision model
- `GROQ_API_KEY` — conversational model
- `PINECONE_API_KEY` and `PINECONE_ENVIRONMENT` — Pinecone vector DB

Keep keys in `.env` and do NOT commit secrets.

---

## Contributing

1. Fork the repository
2. Create a descriptive branch: `git checkout -b feature/you-thing`
3. Make changes and add tests
4. Run tests and format code
5. Open a Pull Request with a clear description

Code style:

- Python: PEP 8
- JavaScript: follow the repo ESLint rules

---

## Troubleshooting

- API key errors: ensure `.env` variables are set and loaded.
- Port conflicts: verify ports 8000 / 8001 / 5173 are free.
- Large images: compress images before upload to avoid memory issues.

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Acknowledgments

- Mistral AI — Pixtral vision models
- Groq — Llama inference
- LangChain — orchestration utilities
- Pinecone — vector search

---

## Future Work

- mobile app
- voice-guided cooking
- smart appliance integrations
- multi-language support

---

KitchenELITE — Your AI-powered kitchen companion 🍳🤖
