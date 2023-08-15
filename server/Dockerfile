FROM node:18.17.0 AS builder

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/

RUN npm i -g pnpm

RUN pnpm i

COPY . .

RUN pnpm build


FROM node:18.17.0

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "pnpm", "start" ]
