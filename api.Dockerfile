FROM node:18-alpine

COPY api /api

RUN cd /api && \
   mkdir dist && \
   npm i && \
   npm run generate-doc && \
   npm run build

RUN chmod +x /api/entrypoint.sh

WORKDIR /api

ENTRYPOINT ["/api/entrypoint.sh"]


