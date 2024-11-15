FROM node:20
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
WORKDIR /usr/src/app/web
RUN npm install
RUN npm run build
WORKDIR /usr/src/app/api
RUN npm install
RUN npm run build
CMD [ "node", "dist/index.js" ]