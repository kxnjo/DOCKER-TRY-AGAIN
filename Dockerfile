# example Dockerfile for a basic Node.js app, alpine keeps the image SMALL (~30mb)
FROM node:18-alpine

# indicate that you want to work within ./app in docker container
WORKDIR /app

# copy all the files from current folder into ./app/...
COPY . .

# install all the necessary packages
RUN npm install

# set the default command run when the container starts.
CMD ["npm", "start"]