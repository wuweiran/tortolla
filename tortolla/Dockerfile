FROM mcr.microsoft.com/openjdk/jdk:21-mariner AS build
WORKDIR /app
RUN tdnf install -y tar
COPY mvnw* /app/
COPY .mvn /app/.mvn
COPY pom.xml /app
COPY application /app/application
COPY domain /app/domain
COPY infrastructure /app/infrastructure
COPY presentation /app/presentation
RUN ls -la /app
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline -B -Dproduction -Dmaven.test.skip=true package


FROM mcr.microsoft.com/openjdk/jdk:21-mariner

COPY --from=build /app/presentation/target/tortolla-presentation-*.jar /usr/src/tortolla/application.jar

EXPOSE 8080
CMD ["/usr/bin/java", "-jar", "/usr/src/tortolla/application.jar"]