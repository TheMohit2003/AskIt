# Use an official Node.js runtime as the base image
FROM node:14

# Create and set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (for the frontend)
COPY client/package*.json ./client/

# Install frontend dependencies
RUN cd client && npm install

# Copy package.json and package-lock.json (for the backend)
COPY server/package*.json ./server/

# Install backend dependencies
RUN cd server && npm install

# Copy the rest of the application code
COPY . .

# Build the frontend (replace with your build script if needed)
RUN cd client && npm run build

# Expose ports (replace with your application's ports)
EXPOSE 3000
EXPOSE 5000

# Start the application (replace with your startup command)
CMD ["node", "server/index.js"]
