FROM node:20

WORKDIR /nodeapp

copy package*.json ./

Run npm install

copy . .

EXPOSE 8080

CMD ["npm","start"]
