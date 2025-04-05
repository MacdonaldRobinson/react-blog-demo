# Stage 1: Build the Vite app
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app with the correct base
RUN VITE_BASE_PATH=$VITE_BASE_PATH npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output from the previous stage to the Nginx server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80
