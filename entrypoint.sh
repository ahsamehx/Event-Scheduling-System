#!/bin/sh
echo ">>> entrypoint.sh is running <<<"

# Wait until PostgreSQL is ready
until nc -z db 5432; do
  echo "Waiting for database to be ready..."
  sleep 1
done

echo "Database is ready"

# Run migrations
npx prisma migrate deploy

# Start backend
npm start
