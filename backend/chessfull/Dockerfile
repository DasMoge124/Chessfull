# This Dockerfile defines the build process for the Chessfull application.
# It uses a multi-stage build to first compile the application using a JDK,
# and then create a lightweight runtime image using a JRE.
# The application is built using Gradle, and the final image is optimized for running the application.

# Dockerfile for containerizing the Chessfull Spring Boot backend application.
# Uses a multi-stage build process for efficiency:
# Stage 1: Build image - Compiles the Java application using Gradle with JDK 25
# Stage 2: Runtime image - Runs the compiled application using a lightweight JRE 25
# The final image contains only the compiled JAR and runtime, keeping size minimal.
# Optimized for deployment to containerized environments like Docker and Kubernetes.

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