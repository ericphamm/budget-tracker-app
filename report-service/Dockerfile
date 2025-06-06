# Use a multi-stage build for efficiency
# --- STAGE 1: Build the application ---
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the Maven pom.xml file first to cache dependencies
COPY pom.xml .

# Download dependencies (this step will be cached if pom.xml doesn't change)
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Package the application, skipping tests for a faster build
RUN mvn clean package -DskipTests

# --- STAGE 2: Create the final image ---
FROM eclipse-temurin:17-jre-focal
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/reportservice-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app listens on (specified as 8081 in application.properties)
EXPOSE 8081

# Define the command to run your application
ENTRYPOINT ["java", "-jar", "app.jar"]