# ---- build ----
FROM node:20-alpine AS builder
WORKDIR /app

# Build arguments
ARG VITE_GEMINI_KEY
ENV VITE_GEMINI_KEY=$VITE_GEMINI_KEY

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- serve ----
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
