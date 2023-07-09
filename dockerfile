FROM node:18-alpine

ARG APP_PORT=3000

ENV APP_PORT=3000

EXPOSE 3000

WORKDIR /app
 
COPY /app .

RUN npm i -g @nestjs/cli

RUN npm ci --omit=dev
 
RUN npm run build
 
USER node

CMD ["npx", "run", "prisma", "migrate", "start"]
 
CMD ["npm", "run", "start:prod"]

#docker build --tag lucasrodrigues062/soat42 .
#docker push lucasrodrigues062/soat42