FROM node:20-alpine

RUN apk add --no-cache openssl netcat-openbsd dos2unix

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN npx prisma generate

COPY entrypoint.sh /entrypoint.sh
RUN dos2unix /entrypoint.sh && chmod +x /entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/entrypoint.sh"]