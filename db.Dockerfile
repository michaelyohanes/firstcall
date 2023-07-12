FROM postgres:15.3

COPY db/init.sql /docker-entrypoint-initdb.d/