FROM node:alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . /usr/src

RUN yarn install
RUN yarn build

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD yarn start