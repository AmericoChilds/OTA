FROM node:lts-alpine

WORKDIR /app

COPY /server/package*.json ./

RUN npm install

COPY /server .

ENV PORT=5000
## init
EXPOSE 5000

CMD ["npm", "start"]