# Use Node 22 as the base image
FROM node:22-bullseye

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install required tools and node packages
RUN apt-get update && \
    apt-get install -y make gcc g++ python3 && \
    npm install && \
    apt-get remove -y make gcc g++ python3 && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* 

# Now copy the rest of your app's source code
COPY . .

# Install PM2 globally with nodemon for live-reloading
RUN npm install pm2 nodemon -g

# DEVELOPMENT ONLY
CMD ["nodemon", "-L", "app/app.js"]
