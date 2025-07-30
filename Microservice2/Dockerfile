FROM openjdk:19
EXPOSE 8082
ADD target/microservice2.jar microservice2.jar
ENTRYPOINT ["java","-jar","microservice2.jar"]

# In this docker file we are using openjdk:19 as base image which does not have mvn installed,
# so that is why before running docker file we need to do mvn clean install and build the jar file