FROM node:16-alpine
RUN addgroup app && adduser -S -G app app
RUN mkdir /app && chown app:app /app
USER app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./
CMD ["npm", "start"]