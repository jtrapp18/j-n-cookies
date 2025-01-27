# Use Python as the base image
FROM python:3.8-slim

# Install system dependencies for PostgreSQL and Python
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && apt-get clean

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Build the static front-end
RUN npm install --prefix client
RUN npm run build --prefix client

# Copy the app
COPY . .

# Expose the port and set the command
EXPOSE 5000
CMD ["flask", "run", "--host=0.0.0.0"]