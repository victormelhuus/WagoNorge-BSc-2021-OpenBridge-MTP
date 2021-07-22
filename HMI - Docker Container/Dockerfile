FROM arm32v7/node:16-alpine3.11


RUN apk update && apk add openssl
# Create app directory
WORKDIR /usr/src/app

# Install app dependenciesdo
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 9999
CMD [ "node", "web.js" , "/bin/sh"]