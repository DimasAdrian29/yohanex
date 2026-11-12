# Step 1: Build the React Application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies deterministically
RUN npm ci --no-audit --no-fund

# Copy source code and build production assets
COPY . .
RUN npm run build

# Step 2: Serve using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration for SPA routing & caching
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose internal port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
