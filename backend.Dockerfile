FROM node:14.15.4

WORKDIR  /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY /backend/package.json .
COPY /backend/package-lock.json . 

USER root
RUN npm install
