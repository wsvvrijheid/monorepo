# path: ./Dockerfile

FROM node:16
# Installing libvips-dev for sharp Compatibility
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install
WORKDIR /opt/app
COPY ./ .
RUN npm install --platform=linux --arch=x64 sharp
RUN yarn build
EXPOSE 1337
CMD ["yarn", "develop"]