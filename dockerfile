#step 1 build of react project
FROM node:12-alpine3.12 As build 
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

#step 2 create 

