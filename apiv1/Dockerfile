

FROM node:16-alpine
WORKDIR /
COPY  /dist /dist
COPY ./package.json /package.json
COPY ./package-lock.json /package-lock.json
ENV NODE_ENV="production"
RUN npm install
CMD ["node", "dist/server.js"]