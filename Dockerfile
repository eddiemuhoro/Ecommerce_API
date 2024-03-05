FROM node:18-alpine

ENV email=usellacompany@gmail.com \
    password=lhqnekuevquucqfr \
    DATABASE_URL=postgresql://postgres:3bCeb11a1g6c5aBCgCdEAg3EAACfA1F-@postgres.railway.internal:5432/railway\
    PORT=3000

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]


