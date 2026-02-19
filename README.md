# <img src="https://img.shields.io/badge/KitchenELITE-FF6B6B?style=for-the-badge&logo=chef-hat&logoColor=white" alt="KitchenELITE"/> 🍳🤖

AI-powered kitchen companion: nutrition scanning, recipe generation, and conversational cooking guidance.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-00ADD8?style=flat-square&logo=huggingface&logoColor=white)](https://abhinavsunil-kitchenelite-api.hf.space/search?query=paneer)  
[![Model Training](https://img.shields.io/badge/Model%20Training-FF9800?style=flat-square&logo=huggingface&logoColor=white)](https://huggingface.co/abhinavsunil/kitchenelite-recipe-model)  
[![Space / API](https://img.shields.io/badge/Space%20/%20API-4CAF50?style=flat-square&logo=huggingface&logoColor=white)](https://huggingface.co/spaces/abhinavsunil/kitchenelite-api/tree/main)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## <img src="https://img.shields.io/badge/Table%20of%20Contents-2196F3?style=for-the-badge&logo=list&logoColor=white" alt="Table of Contents"/>

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

## <img src="https://img.shields.io/badge/Overview-4CAF50?style=for-the-badge&logo=book&logoColor=white" alt="Overview"/>

KitchenELITE combines modern frontend and backend engineering with advanced AI models to deliver:

- 🍎 food-image nutrition analysis
- 🤖 personalized AI recipe generation
- 💬 an interactive conversational cooking assistant
- 🔍 context-aware recipe recommendations (RAG + vector search)

The project integrates a React + Vite frontend with a Python backend (FastAPI + Django) and several ML components (vision + LLMs + vector database).

---

## <img src="https://img.shields.io/badge/Features-FF9800?style=for-the-badge&logo=star&logoColor=white" alt="Features"/>

- **🍎 Nutrition Scanning**: Upload images to receive calories, macro- and micronutrients.
- **🤖 AI Recipe Generation**: Generate recipes from ingredients or preferences.
- **💬 Conversational Assistant**: Stateful chat for step-by-step cooking help.
- **🔍 RAG Recommendations**: Retrieval-augmented recipe suggestions using embeddings.
- **⚙️ Admin & Data**: Django admin, recipe CSV dataset, and ingestion utilities.

---

## <img src="https://img.shields.io/badge/Model%20Training-9C27B0?style=for-the-badge&logo=brain&logoColor=white" alt="Model Training"/>

The project includes a custom-trained model for recipe recommendations using Retrieval-Augmented Generation (RAG).

### Training Process

1. **📊 Dataset**: Uses the "recipes_data_food.com" dataset from Hugging Face (AkashPS11/recipes_data_food.com), containing recipe data with ingredients, categories, and nutritional information.

2. **🧹 Data Cleaning**:
   - Parses recipe ingredients from R list format.
   - Handles missing values defensively.
   - Creates search text by combining recipe name and ingredients.

3. **🧠 Embeddings Generation**:
   - Uses SentenceTransformer model 'all-MiniLM-L6-v2'.
   - Encodes search text into vector embeddings.
   - Normalizes vectors for cosine similarity search.

4. **💾 Vector Database**:
   - Stores embeddings in FAISS index for efficient similarity search.
   - Saves metadata (recipe details) in Parquet format.

5. **🔮 Inference**:
   - Loads model, index, and metadata.
   - Encodes query text and performs nearest neighbor search.
   - Returns top matching recipes with nutritional info.

### Files Involved

- `Backend/MODEL_TRAINIG/training.py`: Main training script (designed for Google Colab with GPU).
- `Backend/MODEL_TRAINIG/inference.py`: Local testing and inference logic.
- `Backend/MODEL_TRAINIG/data_cleaner.py`: Data preprocessing utilities.
- `Backend/MODEL_TRAINIG/embeddings.py`: Embedding generation helpers.

The trained model is available on Hugging Face: [abhinavsunil/kitchenelite-recipe-model](https://huggingface.co/abhinavsunil/kitchenelite-recipe-model).

---

## <img src="https://img.shields.io/badge/Tech%20Stack-607D8B?style=for-the-badge&logo=stack&logoColor=white" alt="Tech Stack"/>

- **🎨 Frontend**: React (Vite), Tailwind CSS, ESLint
- **🐍 Backend**: FastAPI (main API), Django (additional endpoints/admin)
- **🤖 AI / Data**: LangChain, Mistral (vision), Groq Llama (conversational), Pinecone (vector DB)
- **🔧 Python**: 3.10+ with async support; tooling via `pyproject.toml`

---

## <img src="https://img.shields.io/badge/Quick%20Start-4CAF50?style=for-the-badge&logo=rocket&logoColor=white" alt="Quick Start"/>

Prerequisites:

- 🐍 Python 3.10+
- 🌐 Node.js 18+ and `npm`
- 📦 Git
- 🔑 API keys for Mistral, Groq, and Pinecone (see Environment variables)

### Backend (FastAPI + Django)

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

### Frontend (React)

1. In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

2. Open the dev server (usually `http://localhost:5173`).

---

## <img src="https://img.shields.io/badge/Project%20Structure-FF5722?style=for-the-badge&logo=folder&logoColor=white" alt="Project Structure"/>

- [Backend](Backend/) — FastAPI entry (`main.py`), `kitech_elite_server/` (Django project), `IndianHealthyRecipe.csv`
- [Frontend](Frontend/) — React + Vite app, `src/` contains pages and components
- [MODEL_TRAINIG](MODEL_TRAINIG/) — training, embeddings, and inference utilities
- [python_basics](python_basics/) — small Python exercises (separate learning folder)

Refer to the in-repo detailed structure for full file lists.

---

## <img src="https://img.shields.io/badge/Usage%20Guide-795548?style=for-the-badge&logo=guide&logoColor=white" alt="Usage Guide"/>

1. Start Backend and Frontend as shown above.
2. Open the frontend in your browser.
3. Use the **🍎 NutriScan** page to upload food images and receive analysis.
4. Use **🤖 Prepare with AI** to chat and generate recipes from ingredients.

Notes:

- Typical analysis latency depends on model provider (5–15s).
- Sessions are persisted to allow follow-up conversation.

---

## <img src="https://img.shields.io/badge/API%20Reference-00BCD4?style=for-the-badge&logo=api&logoColor=white" alt="API Reference"/>

- `POST /analyse_image` (FastAPI) — upload image file, returns nutritional JSON
- `POST /api/scan-food-image/` (Django) — alternate scanning endpoint
- `POST /api/prepare-ai/` (Django) — generate recipe from text
- `POST /api/guide-ai/` (Django) — conversational assistant (accepts `session_id`)

(See code in `Backend/kitech_elite_server/` for detailed request/response shapes.)

---

## <img src="https://img.shields.io/badge/Environment%20Variables-673AB7?style=for-the-badge&logo=environment&logoColor=white" alt="Environment Variables"/>

- `MISTRAL_API_KEY` — vision model
- `GROQ_API_KEY` — conversational model
- `PINECONE_API_KEY` and `PINECONE_ENVIRONMENT` — Pinecone vector DB

Keep keys in `.env` and do NOT commit secrets.

---

## <img src="https://img.shields.io/badge/Contributing-4CAF50?style=for-the-badge&logo=github&logoColor=white" alt="Contributing"/>

1. Fork the repository
2. Create a descriptive branch: `git checkout -b feature/your-thing`
3. Make changes and add tests
4. Run tests and format code
5. Open a Pull Request with a clear description

Code style:

- 🐍 Python: PEP 8
- 🌐 JavaScript: follow the repo ESLint rules

---

## <img src="https://img.shields.io/badge/Troubleshooting-FF9800?style=for-the-badge&logo=tools&logoColor=white" alt="Troubleshooting"/>

- API key errors: ensure `.env` variables are set and loaded.
- Port conflicts: verify ports 8000 / 8001 / 5173 are free.
- Large images: compress images before upload to avoid memory issues.

---

## <img src="https://img.shields.io/badge/License-FFC107?style=for-the-badge&logo=license&logoColor=white" alt="License"/>

MIT — see [LICENSE](LICENSE) for details.

---

## <img src="https://img.shields.io/badge/Acknowledgments-9E9E9E?style=for-the-badge&logo=heart&logoColor=white" alt="Acknowledgments"/>

- Mistral AI — Pixtral vision models
- Groq — Llama inference
- LangChain — orchestration utilities
- Pinecone — vector search

---

## <img src="https://img.shields.io/badge/Future%20Work-2196F3?style=for-the-badge&logo=future&logoColor=white" alt="Future Work"/>

- 📱 mobile app
- 🎤 voice-guided cooking
- 🏠 smart appliance integrations
- 🌍 multi-language support

---

KitchenELITE — Your AI-powered kitchen companion 🍳🤖

## Model Training

The project includes a custom-trained model for recipe recommendations using Retrieval-Augmented Generation (RAG).

### Training Process

1. **📊 Dataset**: Uses the "recipes_data_food.com" dataset from Hugging Face (AkashPS11/recipes_data_food.com), containing recipe data with ingredients, categories, and nutritional information.

2. **🧹 Data Cleaning**:
   - Parses recipe ingredients from R list format.
   - Handles missing values defensively.
   - Creates search text by combining recipe name and ingredients.

3. **🧠 Embeddings Generation**:
   - Uses SentenceTransformer model 'all-MiniLM-L6-v2'.
   - Encodes search text into vector embeddings.
   - Normalizes vectors for cosine similarity search.

4. **💾 Vector Database**:
   - Stores embeddings in FAISS index for efficient similarity search.
   - Saves metadata (recipe details) in Parquet format.

5. **🔮 Inference**:
   - Loads model, index, and metadata.
   - Encodes query text and performs nearest neighbor search.
   - Returns top matching recipes with nutritional info.

### Files Involved

- `Backend/MODEL_TRAINIG/training.py`: Main training script (designed for Google Colab with GPU).
- `Backend/MODEL_TRAINIG/inference.py`: Local testing and inference logic.
- `Backend/MODEL_TRAINIG/data_cleaner.py`: Data preprocessing utilities.
- `Backend/MODEL_TRAINIG/embeddings.py`: Embedding generation helpers.

The trained model is available on Hugging Face: [abhinavsunil/kitchenelite-recipe-model](https://huggingface.co/abhinavsunil/kitchenelite-recipe-model).

---

## <img src="https://img.shields.io/badge/Tech%20Stack-607D8B?style=for-the-badge&logo=stack&logoColor=white" alt="Tech Stack"/>

- **🎨 Frontend**: React (Vite), Tailwind CSS, ESLint
- **🐍 Backend**: FastAPI (main API), Django (additional endpoints/admin)
- **🤖 AI / Data**: LangChain, Mistral (vision), Groq Llama (conversational), Pinecone (vector DB)
- **🔧 Python**: 3.10+ with async support; tooling via `pyproject.toml`

---

## <img src="https://img.shields.io/badge/Quick%20Start-4CAF50?style=for-the-badge&logo=rocket&logoColor=white" alt="Quick Start"/>

Prerequisites:

- 🐍 Python 3.10+
- 🌐 Node.js 18+ and `npm`
- 📦 Git
- 🔑 API keys for Mistral, Groq, and Pinecone (see Environment variables)

### Backend (FastAPI + Django)

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

### Frontend (React)

1. In a new terminal:

```bash
cd Frontend
npm install
npm run dev
```

2. Open the dev server (usually `http://localhost:5173`).

---

## <img src="https://img.shields.io/badge/Project%20Structure-FF5722?style=for-the-badge&logo=folder&logoColor=white" alt="Project Structure"/>

- [Backend](Backend/) — FastAPI entry (`main.py`), `kitech_elite_server/` (Django project), `IndianHealthyRecipe.csv`
- [Frontend](Frontend/) — React + Vite app, `src/` contains pages and components
- [MODEL_TRAINIG](MODEL_TRAINIG/) — training, embeddings, and inference utilities
- [python_basics](python_basics/) — small Python exercises (separate learning folder)

Refer to the in-repo detailed structure for full file lists.

---

## <img src="https://img.shields.io/badge/Usage%20Guide-795548?style=for-the-badge&logo=guide&logoColor=white" alt="Usage Guide"/>

1. Start Backend and Frontend as shown above.
2. Open the frontend in your browser.
3. Use the **🍎 NutriScan** page to upload food images and receive analysis.
4. Use **🤖 Prepare with AI** to chat and generate recipes from ingredients.

Notes:

- Typical analysis latency depends on model provider (5–15s).
- Sessions are persisted to allow follow-up conversation.

---

## <img src="https://img.shields.io/badge/API%20Reference-00BCD4?style=for-the-badge&logo=api&logoColor=white" alt="API Reference"/>

- `POST /analyse_image` (FastAPI) — upload image file, returns nutritional JSON
- `POST /api/scan-food-image/` (Django) — alternate scanning endpoint
- `POST /api/prepare-ai/` (Django) — generate recipe from text
- `POST /api/guide-ai/` (Django) — conversational assistant (accepts `session_id`)

(See code in `Backend/kitech_elite_server/` for detailed request/response shapes.)

---

## <img src="https://img.shields.io/badge/Environment%20Variables-673AB7?style=for-the-badge&logo=environment&logoColor=white" alt="Environment Variables"/>

- `MISTRAL_API_KEY` — vision model
- `GROQ_API_KEY` — conversational model
- `PINECONE_API_KEY` and `PINECONE_ENVIRONMENT` — Pinecone vector DB

Keep keys in `.env` and do NOT commit secrets.

---

## <img src="https://img.shields.io/badge/Contributing-4CAF50?style=for-the-badge&logo=github&logoColor=white" alt="Contributing"/>

1. Fork the repository
2. Create a descriptive branch: `git checkout -b feature/your-thing`
3. Make changes and add tests
4. Run tests and format code
5. Open a Pull Request with a clear description

Code style:

- 🐍 Python: PEP 8
- 🌐 JavaScript: follow the repo ESLint rules

---

## <img src="https://img.shields.io/badge/Troubleshooting-FF9800?style=for-the-badge&logo=tools&logoColor=white" alt="Troubleshooting"/>

- API key errors: ensure `.env` variables are set and loaded.
- Port conflicts: verify ports 8000 / 8001 / 5173 are free.
- Large images: compress images before upload to avoid memory issues.

---

## <img src="https://img.shields.io/badge/License-FFC107?style=for-the-badge&logo=license&logoColor=white" alt="License"/>

MIT — see [LICENSE](LICENSE) for details.

---

## <img src="https://img.shields.io/badge/Acknowledgments-9E9E9E?style=for-the-badge&logo=heart&logoColor=white" alt="Acknowledgments"/>

- Mistral AI — Pixtral vision models
- Groq — Llama inference
- LangChain — orchestration utilities
- Pinecone — vector search

---

## <img src="https://img.shields.io/badge/Future%20Work-2196F3?style=for-the-badge&logo=future&logoColor=white" alt="Future Work"/>

- 📱 mobile app
- 🎤 voice-guided cooking
- 🏠 smart appliance integrations
- 🌍 multi-language support

---

KitchenELITE — Your AI-powered kitchen companion 🍳🤖
