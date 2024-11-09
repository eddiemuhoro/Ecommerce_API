FROM node:18-alpine

ENV email=usellacompany@gmail.com \
    password=lhqnekuevquucqfr \
    DATABASE_URL=postgresql://postgres://dtnyikoh:0kVTCSqbwKEWZgTRu9AA2Hhk-rGcFuqV@ziggy.db.elephantsql.com/dtnyikoh \
    PORT=4200

RUN npm install -g pnpm

COPY package*.json ./

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm build

EXPOSE 4200

CMD ["pnpm", "start"]


