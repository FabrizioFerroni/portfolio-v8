FROM node:22.23-alpine AS build
WORKDIR /app

ARG APP_NAME
ARG API_URL
ARG API_URL2
ARG AUTH_URL
ARG FILE_URL
ARG RELEASE
ARG VERSION
ARG API_KEY
ARG API_URL_INTERNAL

COPY package*.json ./
RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV} \
    APP_NAME=${APP_NAME} \
    API_URL=${API_URL} \
    API_URL2=${API_URL2} \
    AUTH_URL=${AUTH_URL} \
    FILE_URL=${FILE_URL} \
    RELEASE=${RELEASE} \
    VERSION=${VERSION} \
    API_KEY=${API_KEY} \
    API_URL_INTERNAL=$API_URL_INTERNAL

COPY . .
RUN npm run build

FROM node:22.23-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache nginx supervisor

COPY --from=build /app/dist/PortfolioV8 ./dist/PortfolioV8

COPY nginx/proxy.conf /etc/nginx/http.d/default.conf
COPY process/supervisord.conf /etc/supervisord.conf

EXPOSE 80
CMD ["supervisord", "-c", "/etc/supervisord.conf"]