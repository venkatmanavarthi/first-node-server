FROM node:20
WORKDIR /usr/src/app
ENV MONGO_URI=
COPY . ./
EXPOSE 3000
CMD [ "node", "start"]