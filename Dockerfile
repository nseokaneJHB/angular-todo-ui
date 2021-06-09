FROM node:14.11.0-alpine3.10

WORKDIR /usr/src/app/

COPY . .

RUN npm i -g @angular/cli@11.2.1
RUN npm install -g json-server

RUN json-server --watch db.json

RUN npm i
RUN ng --version
RUN npm run build:prod

EXPOSE $PORT

CMD [ "npm", "run" , "start:prod" ]
