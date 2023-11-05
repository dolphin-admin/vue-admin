FROM node:lts-slim

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .env.development ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]
