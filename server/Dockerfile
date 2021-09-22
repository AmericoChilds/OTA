FROM node:lts-alpine
WORKDIR /app
COPY ./package*.json ./

RUN npm install

COPY . .

ENV PORT=5000
## init
EXPOSE 5000

CMD ["npm", "start"]