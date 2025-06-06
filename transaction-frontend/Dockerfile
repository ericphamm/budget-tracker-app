# --- STAGE 1: Build the React application ---
	FROM node:20-alpine AS build
	WORKDIR /app
	
	# Copy package.json and package-lock.json (or yarn.lock) to leverage Docker cache
	COPY package.json ./
	COPY package-lock.json ./
	
	# Install dependencies
	RUN npm install
	
	# Copy the rest of your application code
	COPY . .
	
	# Build the React application
	RUN npm run build
	
	# --- STAGE 2: Serve the application with Nginx ---
	FROM nginx:stable-alpine
	# Copy the built React app from the previous stage to Nginx's HTML directory
	COPY --from=build /app/dist /usr/share/nginx/html
	
	# Remove default Nginx config to avoid conflicts if you were to add your own later
	RUN rm /etc/nginx/conf.d/default.conf
	
	# Add a simple Nginx configuration for a single-page application (SPA)
	# This configuration ensures that all requests are served by index.html,
	# which is necessary for React Router to work correctly on refreshes.
	COPY nginx.conf /etc/nginx/conf.d/default.conf
	
	# Expose port 80, the default HTTP port for Nginx
	EXPOSE 80
	
	# Command to run Nginx
	CMD ["nginx", "-g", "daemon off;"]