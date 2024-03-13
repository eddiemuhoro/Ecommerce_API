FROM node:18-alpine

ENV email=usellacompany@gmail.com \
    password=lhqnekuevquucqfr \
    DATABASE_URL=postgresql://postgres://dtnyikoh:0kVTCSqbwKEWZgTRu9AA2Hhk-rGcFuqV@ziggy.db.elephantsql.com/dtnyikoh \
    PORT=3000

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]


