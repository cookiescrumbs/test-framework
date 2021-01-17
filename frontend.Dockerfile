FROM node:14.15.4

WORKDIR  /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY /frontend/package.json .
COPY /frontend/package-lock.json . 

USER root
RUN npm install
