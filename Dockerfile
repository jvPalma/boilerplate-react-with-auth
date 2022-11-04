FROM node:14.18.2-alpine as base
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json yarn.lock tsconfig*.json ./

FROM base as build
WORKDIR /app
RUN yarn install --immutable --immutable-cache --check-cache
COPY . .
ENV SKIP_PREFLIGHT_CHECK=true
RUN yarn run build

FROM nginx:stable-alpine as release
ENV NODE_ENV=production
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/.env.example /usr/share/nginx/html/.env
COPY --from=build /app/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html/
RUN apk add --update nodejs
RUN apk add --update npm
RUN npm install -g runtime-env-cra

EXPOSE 80
CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
