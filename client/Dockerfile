# Step 1: Build CRA app
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve bằng Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Optional: custom nginx.conf nếu dùng react-router
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
