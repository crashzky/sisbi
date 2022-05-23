FROM node:16

COPY package*.json ./

WORKDIR /usr/src/app

RUN npm install --production --legacy-peer-deps

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]