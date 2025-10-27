# Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
#installer npm
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
