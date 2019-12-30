FROM mysql:5

# Expose server port.
#EXPOSE 3306

ENV MYSQL_ROOT_PASSWORD abcde12345
ENV MYSQL_DATABASE docker_kubernetes_example_type_a
ENV MYSQL_USER type_a
ENV MYSQL_PASSWORD abcde12345

ADD initialize_db.sql /docker-entrypoint-initdb.d
