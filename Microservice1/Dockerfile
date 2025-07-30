FROM openjdk:19
EXPOSE 8080
ADD target/microservice1.jar microservice1.jar
ENTRYPOINT ["java","-jar","microservice1.jar"]

# In this docker file we are using openjdk:19 as base image which does not have mvn installed,
# so that is why before running docker file we need to do mvn clean install and build the jar file