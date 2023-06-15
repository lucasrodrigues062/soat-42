FROM node:18-alpine
 
WORKDIR /app
 
COPY /app .

RUN npm i -g @nestjs/cli

RUN npm ci --omit=dev
 
RUN npm run build
 
USER node
 
CMD ["npm", "run", "start:prod"]

#docker build --tag lucasrodrigues062/soat42 .
#docker push lucasrodrigues062/soat42