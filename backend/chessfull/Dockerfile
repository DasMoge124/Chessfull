# Stage 1: Build
# Use 25-jdk to match your project's toolchain requirement
FROM eclipse-temurin:25-jdk-jammy AS build
WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

RUN chmod +x ./gradlew
COPY src src

# Build without tests to save memory and time
RUN ./gradlew bootJar -x test --no-daemon

# Stage 2: Run
# Use 25-jre for the runtime
FROM eclipse-temurin:25-jre-jammy
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

# Render will override this port, but 8085 matches your local preference
EXPOSE 8085
ENTRYPOINT ["java", "-jar", "app.jar"]