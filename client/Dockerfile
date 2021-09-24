FROM node:lts-alpine
WORKDIR /app
COPY /client/package*.json ./

RUN npm install

COPY /client .

ENV PORT=80

EXPOSE 80

CMD ["npm", "start"]