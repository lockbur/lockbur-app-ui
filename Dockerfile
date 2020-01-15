FROM nginx:1.14.2-alpine
# Copy APP Files
COPY dist/ /usr/share/nginx/html
