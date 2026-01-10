# Stage 1: Build
FROM eclipse-temurin:25-jdk-jammy AS build
WORKDIR /app

# Copy Gradle wrapper and config
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Pre-download dependencies to speed up subsequent builds
RUN ./gradlew dependencies --no-daemon

# Copy source and build
COPY src src
RUN ./gradlew bootJar -x test --no-daemon

# Stage 2: Run
FROM eclipse-temurin:25-jre-jammy
WORKDIR /app

# Add a non-root user for better security on Render
RUN useradd -m springuser
USER springuser

COPY --from=build /app/build/libs/*.jar app.jar

# Render uses the PORT env var; Spring Boot recognizes this automatically,
# but we set a default just in case.
ENV PORT=8085
EXPOSE 8085

ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-jar", "app.jar"]