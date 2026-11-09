FROM node:24-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --chown=node:node cms/model.mjs /app/model.mjs
COPY --chown=node:node cms/studio/ /app/studio/
COPY --chown=node:node public/etapel-logo.svg /app/studio/public/logo.svg
COPY --chown=node:node public/images/quienes-etapel-equipo.webp /app/studio/public/workshop.webp
USER node
CMD ["node", "studio/server.mjs"]
