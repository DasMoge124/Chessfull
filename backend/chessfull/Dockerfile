# Stage 1: Build
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copy gradle files first to cache dependencies
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Grant execution permissions for the wrapper
RUN chmod +x ./gradlew

# Copy source code and build
COPY src src
RUN ./gradlew bootJar --no-daemon

# Stage 2: Run
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
# Note: The JAR name usually follows the pattern 'projectname-version.jar'
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8085
ENTRYPOINT ["java", "-jar", "app.jar"]