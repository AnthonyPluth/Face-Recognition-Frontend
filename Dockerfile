FROM nginx:1.19.0
# copy application outpub from `npm run build` into the nginx container
COPY build /usr/share/nginx/html