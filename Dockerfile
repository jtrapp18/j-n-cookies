# Use Python as the base image
FROM python:3.8-slim

# Install system dependencies for PostgreSQL, Python, and Node.js
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    curl \
    && apt-get clean

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Install and build the React frontend
COPY client ./client
RUN npm install --prefix client
RUN npm run build --prefix client

# Copy the rest of the app
COPY . .

# Expose the port and set the command to start Gunicorn
EXPOSE 5000
CMD ["gunicorn", "--chdir", "server", "--log-level", "debug", "app:app"]