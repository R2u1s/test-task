FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i --no-audit --no-fund
COPY . ./
ENTRYPOINT ["npm", "run", "start"]