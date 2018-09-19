FROM java:8-jdk-alpine
VOLUME /tmp
COPY target/site2*.jar app.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]

