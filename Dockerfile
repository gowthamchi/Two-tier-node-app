FROM node:20

WORKDIR /nodeapp

copy package*.json ./

Run npm install

copy . .

EXPOSE 4000

CMD ["npm","start"]
