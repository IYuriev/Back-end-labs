FROM node:20-alpine3.19

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
