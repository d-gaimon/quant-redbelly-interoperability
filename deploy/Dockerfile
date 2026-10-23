# Serves site/ with nginx. Build from the repository root:
#   docker build -f deploy/Dockerfile -t overledger-research .
FROM nginx:1.27-alpine

COPY deploy/headers.conf /etc/nginx/snippets/overledger-research-headers.conf
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i 's#root /var/www/quant-redbelly-interoperability/site;#root /usr/share/nginx/html;#; s#server_name research.example.org;#server_name _;#' /etc/nginx/conf.d/default.conf \
 && rm -rf /usr/share/nginx/html/*
COPY site/ /usr/share/nginx/html/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
