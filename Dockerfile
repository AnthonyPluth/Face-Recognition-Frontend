FROM nginx:1.13.5-alpine
RUN echo "http://dl-cdn.alpinelinux.org/alpine/main" >> /etc/apk/repositories && \
  apk upgrade --no-cache --update
  # copy application outpub from `npm run build` into the nginx container
COPY build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
# expose our port
EXPOSE 80
