# Stage 1: Build
FROM eclipse-temurin:17-jdk-jammy AS build
WORKDIR /app

# Copy the wrapper and configuration files first (better for caching)
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Fix permission for the wrapper (crucial for Linux)
RUN chmod +x ./gradlew

# Copy the source code
COPY src src

# The FIX: Tell Gradle to ignore toolchains and just use the current JDK
RUN ./gradlew bootJar -x test --no-daemon -Porg.gradle.java.installations.auto-detect=false -Porg.gradle.java.installations.auto-download=false

# Stage 2: Run
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
# Use a wildcard to find the jar since name might vary by version
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8085
ENTRYPOINT ["java", "-jar", "app.jar"]