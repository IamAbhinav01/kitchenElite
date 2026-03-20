# Backend Dockerfile for Render

FROM python:3.12-slim

# Install uv for faster dependency management
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

# Set working directory
WORKDIR /app

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Install dependencies
RUN uv sync --frozen --no-cache

# Copy the rest of the application
COPY . .

# Expose the default Render port
EXPOSE 10000

# Set environment variables for the application
ENV HOST=0.0.0.0
ENV PORT=10000

# Command to run the Django application
# We use --app-dir to point to the directory containing manage.py
CMD ["uv", "run", "uvicorn", "kitech_elite_server.asgi:application", "--app-dir", "kitech_elite_server", "--host", "0.0.0.0", "--port", "10000"]
