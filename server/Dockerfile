FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./app

RUN npm install

COPY . .

ENV PORT=5000
## init
EXPOSE 5000

CMD ["npm", "start"]