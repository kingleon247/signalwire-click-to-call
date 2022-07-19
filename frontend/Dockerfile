# Dockerfile

# Use node alpine as it's a small node image
FROM node:16-alpine

## Create the directory on the node image
## where our Next.js app will live
#RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package.json yarn.lock ./

# Install dependencies in /app
RUN yarn install

# Copy the rest of our Next.js folder into /app
COPY next.config.js ./next.config.js
COPY src/pages ./pages
COPY public ./public
COPY styles ./styles

CMD ["yarn", "dev"]

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# Run yarn dev, as we would via the command line
CMD ["yarn", "dev"]