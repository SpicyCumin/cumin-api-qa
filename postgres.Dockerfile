FROM postgres:latest

RUN mkdir /seed/

COPY *.csv /seed/

RUN chmod a+rx /seed

COPY qs.sql /docker-entrypoint-initdb.d
