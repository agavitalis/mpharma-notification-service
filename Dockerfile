FROM node:16.5.0-alpine

WORKDIR /notification-service

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 5002

CMD ["npm", "start"]