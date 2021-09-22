FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package.json ./

RUN npm install

COPY . .

ARG BASE_URL
ENV REACT_APP_BASE_URL=${BASE_URL}

EXPOSE 80

EXPOSE 443

CMD ["npm", "start"]