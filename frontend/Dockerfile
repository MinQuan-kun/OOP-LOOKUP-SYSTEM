FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Chạy lệnh dev server
CMD ["npm", "run", "dev"]