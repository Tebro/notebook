FROM node:onbuild

RUN npm install -g gulp
RUN gulp

EXPOSE 8080

