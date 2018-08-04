FROM debian:latest

RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update
RUN apt-get install -y \
  curl \
  git \
  gnupg2

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN npm i -g yarn

RUN echo "Installed node $(node -v)"
RUN echo "Installed npm $(npm -v)"
RUN echo "Installed yarn $(yarn -v)"

RUN echo "Coping files..."

COPY . ./

RUN yarn install
