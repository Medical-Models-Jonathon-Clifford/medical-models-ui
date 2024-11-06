# Use the official nginx image from the Docker Hub
FROM nginx:alpine

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static assets into the nginx default html directory
COPY ./apps/medical-models/out /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
