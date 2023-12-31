FROM node:18-alpine

COPY app /app

RUN cd /app && \
   npm i && \
   npm run build

RUN chmod +x /app/entrypoint.sh

WORKDIR /app

ENTRYPOINT ["/app/entrypoint.sh"]


