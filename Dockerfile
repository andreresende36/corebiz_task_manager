FROM node:18

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

COPY wait-for-it.sh /usr/local/bin/

EXPOSE 3000

CMD ["./wait-for-it.sh", "db:3306", "--", "./start.sh"]