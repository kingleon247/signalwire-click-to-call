FROM node:lts as dependencies
WORKDIR /var/www/html/frontend
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:lts as builder
WORKDIR /var/www/html/frontend
COPY . .
COPY --from=dependencies /var/www/html/frontend/node_modules ./node_modules
RUN yarn build

FROM node:lts as runner
WORKDIR /var/www/html/frontend
ENV NODE_ENV production
# If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /var/www/html/frontend/next.config.js ./
COPY --from=builder /var/www/html/frontend/public ./public
COPY --from=builder /var/www/html/frontend/.next ./.next
COPY --from=builder /var/www/html/frontend/node_modules ./node_modules
COPY --from=builder /var/www/html/frontend/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
