# =============================================================================
# KitchenElite Backend — Production Dockerfile for Render
# =============================================================================
# Architecture  : Django 5.x (ASGI) served by Gunicorn + Uvicorn workers
# Python        : 3.12-slim
# Package mgr   : uv (locked install)
# PyTorch       : CPU-only (Render has no GPU; avoids ~4 GB CUDA download)
# Port          : 10000  (Render requirement)
# =============================================================================

# ── Stage 1: dependency builder ───────────────────────────────────────────────
FROM python:3.12-slim AS builder

# Bring in uv binary
COPY --from=ghcr.io/astral-sh/uv:0.6 /uv /uvx /bin/

WORKDIR /app

# System deps needed to compile some ML wheels (e.g. tokenizers, faiss)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    libffi-dev \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests first (maximises Docker layer cache)
COPY pyproject.toml uv.lock ./

# ── Critical: override the CUDA PyTorch index with CPU-only index ─────────────
# Render has NO GPU. The pyproject.toml points torch to download.pytorch.org/whl/cu121
# which would pull ~5 GB CUDA wheels and likely OOM the build.
# We override just the torch sources to the CPU index at install time.
# uv respects UV_INDEX_* overrides via env; we patch here directly.
RUN uv sync --frozen --no-cache \
    --no-dev \
    --index-url https://pypi.org/simple/ \
    --extra-index-url https://download.pytorch.org/whl/cpu

# ── Stage 2: lean runtime image ───────────────────────────────────────────────
FROM python:3.12-slim AS runtime

# Runtime-only system libs (no build tools)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy installed virtualenv from builder (avoids reinstalling)
COPY --from=builder /app/.venv /app/.venv

# Ensure the venv is first on PATH
ENV PATH="/app/.venv/bin:$PATH"

# Copy the entire Backend source (excluding .venv, .env, __pycache__ via .dockerignore)
COPY . .

# ── Django production settings ────────────────────────────────────────────────
# These are SAFE DEFAULTS only. Override every single one via Render env vars.
ENV DJANGO_SETTINGS_MODULE=kitech_elite_server.settings
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Render injects PORT; we default to 10000 to satisfy its health-check
ENV PORT=10000

# SECURITY: These MUST be set as environment variables in Render dashboard
# SECRET_KEY       → your real secret
# DEBUG            → False
# ALLOWED_HOSTS    → your-app.onrender.com
# FRONTEND_URL     → https://your-frontend.onrender.com
# MISTRAL_API_KEY  → from .env
# GROQ_API_KEY     → from .env
# PINECONE_API_KEY → from .env
# INDEX_NAME       → kitchenelite
# HUGGING_FACE     → from .env

# Collect static files at build time (no-input, fails silently if none)
# manage.py lives inside kitech_elite_server sub-directory
RUN python kitech_elite_server/manage.py collectstatic --noinput --clear \
    || echo "[WARN] collectstatic failed — check STATIC_ROOT in settings.py"

# Run database migrations at startup (SQLite is fine for Render free tier;
# for production scale, replace with PostgreSQL and run migrations in a
# Render pre-deploy job instead)
# We use a shell entrypoint script for this.

EXPOSE 10000

# ── Start command ─────────────────────────────────────────────────────────────
# Gunicorn with UvicornWorker = ASGI support (handles async views + Django channels)
# Workers formula: 2 * CPU + 1. Render free tier has 0.1 vCPU → 2 workers is fine.
# --timeout 120 : AI inference can take 10-30 s; 30 s default would kill requests.
# --graceful-timeout 60 : lets in-flight LLM calls complete on SIGTERM.
# --worker-class uvicorn.workers.UvicornWorker: ASGI-compatible.
# chdir into kitech_elite_server so manage.py / models / utils are on sys.path.

CMD sh -c "\
    cd kitech_elite_server && \
    python manage.py migrate --noinput && \
    exec gunicorn \
        kitech_elite_server.asgi:application \
        --worker-class uvicorn.workers.UvicornWorker \
        --workers 2 \
        --threads 1 \
        --bind 0.0.0.0:${PORT} \
        --timeout 120 \
        --graceful-timeout 60 \
        --access-logfile - \
        --error-logfile - \
        --log-level info \
"
