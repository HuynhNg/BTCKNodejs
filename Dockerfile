# Use the official Node.js image
FROM node:20-alpine

# Create and set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN apk update

COPY . .

# Install dependencies
RUN npm install
RUN npm install bcryptjs

# Copy the rest of the application code


# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
