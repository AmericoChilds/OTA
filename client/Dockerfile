FROM node:lts-alpine
WORKDIR /app
COPY /client/package*.json ./

RUN npm install

COPY /client .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]