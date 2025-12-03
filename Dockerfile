FROM node:22.20.0

# Set working directory inside the container
WORKDIR /

# Copy only package.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend code into the container
COPY . .

# Generate the Prisma client from schema.prisma
RUN npx prisma generate

RUN apt-get update && apt-get install -y netcat-openbsd

# Expose the backend port (change if you use a different port)
EXPOSE 3000

# Start the backend application
CMD ["sh", "entrypoint.sh"]

