FROM node:20-alpine

# Install required packages
RUN apk add --no-cache openssl netcat-openbsd dos2unix

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy application code
COPY . .

# Generate Prisma Client with correct binary target
RUN npx prisma generate

# Fix entrypoint line endings
COPY entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]