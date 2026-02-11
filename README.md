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

# KitchenElite

### LIVE LINK MODEL : https://abhinavsunil-kitchenelite-api.hf.space/search?query=paneer

# MODEL TRAINING HUGGING FACE: https://huggingface.co/abhinavsunil/kitchenelite-recipe-model

# MODEL SPACE HUGGING FACE : https://huggingface.co/spaces/abhinavsunil/kitchenelite-api/tree/main

## Project Overview

KitchenElite is a comprehensive full-stack web application that harnesses the power of AI-powered vision models to analyze food images and deliver precise nutritional information. The platform integrates a modern React frontend with a robust Python backend utilizing both FastAPI and Django frameworks. It employs advanced AI technologies including LangChain, Mistral AI's Pixtral vision model for food recognition, and Groq's Llama model for conversational AI interactions. Additionally, it features a sophisticated RAG (Retrieval-Augmented Generation) system powered by Pinecone for intelligent recipe recommendations and a conversational cooking assistant.

The application serves as an all-in-one kitchen companion, offering food nutrition scanning, AI-powered recipe generation, interactive cooking guidance, and access to a curated database of healthy Indian recipes.

## Features

- **Advanced Food Image Analysis**: Upload food images to receive instant, detailed nutritional breakdowns including calories, macronutrients (protein, carbohydrates, fat), and micronutrients (fiber, sugars, sodium)
- **AI-Powered Recipe Generation**: Generate personalized recipes based on available ingredients or food preferences using conversational AI
- **Interactive Cooking Assistant**: Engage with an AI chatbot for step-by-step cooking guidance, ingredient substitutions, and culinary advice
- **Comprehensive Recipe Database**: Access a rich dataset of Indian healthy recipes with ingredients, instructions, nutritional information, and ratings
- **Intelligent Recipe Recommendations**: Utilize RAG technology for context-aware recipe suggestions based on user queries
- **Responsive Modern Interface**: Sleek React-based frontend with Tailwind CSS styling and smooth navigation
- **Dual Backend Architecture**: Scalable backend with FastAPI for high-performance API endpoints and Django for additional web services
- **Vector Search Integration**: Pinecone-powered efficient recipe retrieval and similarity search
- **Session-Based Conversations**: Persistent chat sessions for continuous cooking assistance
- **Cross-Platform Compatibility**: Works seamlessly across desktop and mobile devices

## Tech Stack

### Frontend

- **React 19** with Vite for ultra-fast development and building
- **React Router DOM** for client-side routing and navigation
- **Tailwind CSS** for utility-first, responsive styling
- **Lucide React** for beautiful, consistent iconography
- **ESLint** for code quality and consistency
- **PostCSS** and **Autoprefixer** for CSS processing

### Backend

- **FastAPI** for high-performance REST API endpoints with automatic OpenAPI documentation
- **Django** with Django REST Framework for additional web services and admin interface
- **LangChain** for advanced LLM orchestration and chain management
- **Mistral AI Pixtral-12B** for state-of-the-art vision analysis and food recognition
- **Groq Llama-3.3-70B** for conversational AI and recipe generation
- **Pinecone** for vector database and efficient similarity search
- **Python 3.10+** with modern async/await patterns
- **Pillow** for image processing and manipulation
- **Uvicorn** for ASGI server deployment

### Data & AI

- **Mistral AI** for multimodal language and vision models
- **LangChain** for RAG implementation and conversational chains
- **Pinecone Vector Database** for recipe embeddings and retrieval
- **CSV Dataset** of authentic Indian healthy recipes
- **JSON-based Chat History** for persistent conversational sessions

## Project Structure

```
kitchenELITE/
├── index.html                          # Root HTML template (legacy)
├── README.md                           # Project documentation
├── style.css                           # Root styles (legacy)
├── Backend/                            # Python backend directory
│   ├── IndianHealthyRecipe.csv         # Comprehensive dataset of Indian healthy recipes
│   ├── main.py                         # FastAPI application entry point
│   ├── pyproject.toml                  # Modern Python project configuration
│   ├── __pycache__/                    # Python bytecode cache (auto-generated)
│   └── kitech_elite_server/           # Django project directory
│       ├── db.sqlite3                  # SQLite database for Django models
│       ├── manage.py                   # Django command-line management utility
│       ├── PASTE_ID.json               # API key storage (should be in .env)
│       ├── api/                        # Django REST API application
│       │   ├── __init__.py             # Package initializer
│       │   ├── admin.py                # Django admin configuration
│       │   ├── apps.py                 # Django app configuration
│       │   ├── models.py               # Database models (currently empty)
│       │   ├── tests.py                # Unit tests
│       │   ├── urls.py                 # API URL routing
│       │   ├── views.py                # API view functions
│       │   └── __pycache__/            # Bytecode cache
│       ├── kitech_elite_server/       # Django project settings
│       │   ├── __init__.py             # Package initializer
│       │   ├── asgi.py                 # ASGI configuration
│       │   ├── settings.py             # Django settings and configuration
│       │   ├── urls.py                 # Main URL routing
│       │   ├── wsgi.py                 # WSGI configuration
│       │   └── __pycache__/            # Bytecode cache
│       ├── models/                     # AI/ML models directory
│       │   ├── __init__.py             # Package initializer
│       │   ├── conversational_ai.py    # Conversational AI utilities
│       │   ├── foodNutritionLLM.py     # Core vision LLM for food analysis
│       │   ├── image_decoder.py        # Image processing utilities
│       │   ├── memory.py               # Chat memory management
│       │   ├── prepare_with_ai.py      # Recipe generation and chat guidance
│       │   ├── rag_model.py            # RAG model for recipe recommendations
│       │   ├── user1_history.json      # Sample user chat history
│       │   ├── user1.json              # User data storage
│       │   └── __pycache__/            # Bytecode cache
│       │   └── assets/                 # Model assets and resources
│       ├── nutriscan/                  # Nutrition scanner Django app
│       │   ├── __init__.py             # Package initializer
│       │   ├── admin.py                # Admin configuration
│       │   ├── apps.py                 # App configuration
│       │   ├── models.py               # Database models
│       │   ├── tests.py                # Unit tests
│       │   └── __pycache__/            # Bytecode cache
│       │   └── migrations/             # Database migrations
│       │       ├── __init__.py         # Package initializer
│       │       └── __pycache__/        # Bytecode cache
│       └── utils/                      # Utility functions
│           ├── __init__.py             # Package initializer
│           ├── extracting_json.py      # JSON extraction from LLM responses
│           ├── image_to_url.py         # Image to data URL conversion
│           ├── rag_model_ingestion.py  # Data ingestion for RAG model
│           └── __pycache__/            # Bytecode cache
├── Frontend/                           # React frontend directory
│   ├── eslint.config.js                # ESLint configuration
│   ├── index.html                      # Main HTML template
│   ├── package.json                    # Node.js dependencies and scripts
│   ├── README.md                       # Frontend-specific documentation
│   ├── vite.config.js                  # Vite build configuration
│   ├── public/                         # Static assets
│   └── src/                            # React source code
│       ├── app.css                     # Global application styles
│       ├── App.jsx                     # Main React application component
│       ├── index.css                   # Global CSS styles
│       ├── main.jsx                    # React application entry point
│       ├── assets/                     # React assets (logo, images)
│       ├── components/                 # Reusable React components
│       │   ├── Features.jsx            # Features showcase component
│       │   ├── HomePage.jsx            # Landing page component
│       │   ├── Nav.module.css          # Navigation styles
│       │   └── PageNav.jsx             # Navigation component
│       └── pages/                      # Page-level components
│           ├── NutriScan.jsx           # Nutrition scanner page
│           └── Prepare_with_AI.jsx     # AI recipe preparation page
└── python_basics/                      # Python learning exercises
    ├── abstract.py                     # Abstract classes demonstration
    ├── atm.py                          # ATM system simulation
    ├── checker.py                      # Code quality checker
    ├── classes.py                      # OOP class examples
    ├── file_handling.py                # File I/O operations
    ├── Inheritance.py                  # Inheritance patterns
    ├── iterables.py                    # Iterables and iterators
    ├── lms.py                          # Learning Management System
    ├── loop.py                         # Loop constructs
    ├── package.json                    # Node.js config (misplaced)
    ├── README.md                       # Python basics documentation
    ├── readTextFile                    # Text file reading example
    └── serialisation.py                # Data serialization techniques
```

## Detailed Component Descriptions

### Backend Components

#### Core AI Models (`models/`)

- **foodNutritionLLM.py**: Implements the `FoodNutritionVisionLLM` class using Mistral AI's Pixtral-12B model for analyzing food images. Processes images to extract food names, portion sizes, and comprehensive nutritional data including calories, macronutrients, and micronutrients.

- **prepare_with_ai.py**: Contains functions for AI-powered recipe generation (`generate_recipe`) and conversational cooking guidance (`guide_chat`). Uses Groq's Llama-3.3-70B model with LangChain for maintaining chat history and context.

- **rag_model.py**: Retrieval-Augmented Generation implementation for intelligent recipe recommendations. Leverages Pinecone vector database for efficient similarity search across the recipe dataset.

- **conversational_ai.py**: Utilities for managing conversational AI interactions, including prompt engineering and response formatting.

- **memory.py**: Chat memory management system for persistent conversational sessions across API calls.

- **image_decoder.py**: Image processing utilities supporting various formats and preparing images for vision model analysis.

#### API Endpoints

- **FastAPI Endpoints** (`main.py`):
  - `POST /`: Welcome endpoint returning application greeting
  - `POST /analyse_image`: Accepts image file uploads and returns detailed nutritional analysis

- **Django REST API Endpoints** (`api/views.py`):
  - `POST /api/scan-food-image/`: Alternative image scanning endpoint with Django
  - `POST /api/prepare-ai/`: Generates recipes based on food text input
  - `POST /api/guide-ai/`: Interactive cooking assistant with session management

#### Utilities (`utils/`)

- **extracting_json.py**: Robust JSON extraction from LLM text responses, handling various output formats
- **image_to_url.py**: Converts image bytes to data URLs compatible with vision APIs
- **rag_model_ingestion.py**: Scripts for ingesting recipe data into Pinecone vector database

### Frontend Components

- **App.jsx**: Main application component with routing configuration for Home, Features, NutriScan, and Prepare with AI pages

- **HomePage.jsx**: Landing page with application introduction, feature highlights, and navigation

- **Features.jsx**: Detailed features showcase component

- **NutriScan.jsx**: Image upload interface for nutrition analysis with real-time results display

- **Prepare_with_AI.jsx**: Conversational interface for recipe generation and cooking guidance

- **PageNav.jsx**: Responsive navigation component with mobile-friendly hamburger menu

## Setup and Installation

### Prerequisites

- **Python 3.10 or higher**
- **Node.js 18+ and npm**
- **Git** for version control
- **API Keys**: Mistral AI, Groq, and Pinecone accounts for AI services

### Backend Setup

1. **Navigate to Backend Directory**:

   ```bash
   cd Backend
   ```

2. **Create Virtual Environment** (recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:

   ```bash
   pip install -e .
   ```

4. **Environment Configuration**:
   Create a `.env` file in the `Backend` directory:

   ```env
   MISTRAL_API_KEY=your_mistral_api_key_here
   GROQ_API_KEY=your_groq_api_key_here
   PINECONE_API_KEY=your_pinecone_api_key_here
   PINECONE_ENVIRONMENT=your_pinecone_environment
   ```

5. **Database Setup** (Django):

   ```bash
   cd kitech_elite_server
   python manage.py migrate
   ```

6. **Start FastAPI Server**:

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

7. **Start Django Server** (optional, for additional endpoints):
   ```bash
   python manage.py runserver 8001
   ```

### Frontend Setup

1. **Navigate to Frontend Directory**:

   ```bash
   cd Frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start Development Server**:

   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   npm run preview
   ```

## Usage Guide

### Getting Started

1. Ensure both backend servers (FastAPI on port 8000, Django on port 8001) are running
2. Start the frontend development server (typically on port 5173)
3. Open your browser to `http://localhost:5173`

### Nutrition Scanning

1. Navigate to the "NutriScan" page
2. Click "Choose File" to upload a food image
3. Wait for AI analysis (typically 5-10 seconds)
4. View detailed nutritional breakdown including:
   - Food name identification
   - Estimated portion size
   - Calorie count
   - Macronutrient composition (protein, carbs, fat)
   - Micronutrient details (fiber, sugars, sodium)

### AI Recipe Preparation

1. Go to the "Prepare with AI" page
2. Enter ingredients or food preferences in the chat interface
3. Receive personalized recipe suggestions
4. Ask follow-up questions for cooking guidance
5. Sessions are automatically saved for continuity

### Interactive Cooking Assistant

- Use the chat interface for real-time cooking advice
- Ask about ingredient substitutions
- Get step-by-step cooking instructions
- Receive tips for dietary modifications

## API Documentation

### FastAPI Endpoints

#### POST /

- **Description**: Welcome endpoint
- **Response**: `{"message": "HI, Welcome to KitchenEliteAI"}`

#### POST /analyse_image

- **Description**: Analyze uploaded food image for nutritional content
- **Parameters**: `file` (UploadFile) - Image file
- **Response**: JSON with filename and detailed nutritional analysis

### Django REST API Endpoints

#### POST /api/scan-food-image/

- **Description**: Alternative image scanning endpoint
- **Parameters**: `image` (file) - Food image
- **Response**: Detailed nutritional JSON or error message

#### POST /api/prepare-ai/

- **Description**: Generate recipe from food description
- **Parameters**: `food` (string) - Food name or ingredients
- **Response**: Complete recipe JSON with ingredients and instructions

#### POST /api/guide-ai/

- **Description**: Interactive cooking assistant
- **Parameters**:
  - `message` (string) - User message
  - `session_id` (string, optional) - Chat session identifier
- **Response**: AI reply with session ID

## Development and Deployment

### Running Tests

```bash
# Backend tests
cd Backend
python -m pytest

# Frontend tests
cd Frontend
npm test
```

### Building for Production

```bash
# Frontend build
cd Frontend
npm run build

# Backend deployment
cd Backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Environment Variables

Ensure all required API keys are set in your environment or `.env` file:

- `MISTRAL_API_KEY`: For vision analysis
- `GROQ_API_KEY`: For conversational AI
- `PINECONE_API_KEY`: For vector database
- `PINECONE_ENVIRONMENT`: Pinecone environment name

## Contributing

We welcome contributions to KitchenElite! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with clear commit messages
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request with detailed description

### Code Style

- **Python**: Follow PEP 8 guidelines
- **JavaScript/React**: Use ESLint configuration
- **Commits**: Use conventional commit format

## Troubleshooting

### Common Issues

1. **API Key Errors**: Ensure all required API keys are set in `.env` file
2. **Port Conflicts**: Check if ports 8000, 8001, 5173 are available
3. **Image Upload Issues**: Verify image format is supported (JPEG, PNG)
4. **Memory Errors**: Large images may cause processing issues

### Performance Optimization

- Use image compression before upload
- Implement caching for frequent queries
- Monitor API rate limits for AI services

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Mistral AI** for providing the powerful Pixtral vision model
- **Groq** for fast inference with Llama models
- **LangChain** for excellent LLM orchestration framework
- **Pinecone** for reliable vector database services
- **React and Vite** communities for amazing development tools
- **Indian Recipe Dataset** contributors for culinary inspiration

## Future Enhancements

- Mobile application development
- Voice-guided cooking instructions
- Integration with smart kitchen appliances
- Advanced dietary planning features
- Multi-language support
- Social recipe sharing platform

---

**KitchenElite** - Your AI-powered kitchen companion for healthier, smarter cooking! 🍳🤖
