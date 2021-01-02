# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
ENV NODE_OPTIONS=--max-old-space-size=1096
ENV TOOL_NODE_FLAGS=--max_old_space_size=1096
RUN npm ci --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM node:13.12.0-alpine
COPY --from=build /app/build /app
COPY server/* /app/server/
WORKDIR /app/server
ENV TOOL_NODE_FLAGS=--max_old_space_size=1096
RUN npm install -g --silent
EXPOSE 80
CMD ["npm", "start"]