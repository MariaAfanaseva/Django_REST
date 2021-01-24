FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/prod/nginx/bike_store.conf /etc/nginx/conf.d/
COPY ./static/ /static/
RUN chown nginx:nginx -R /static/
