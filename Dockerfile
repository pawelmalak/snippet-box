FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build server code
RUN npm run build

ENV NODE_ENV=production

CMD ["node", "build/server.js"]