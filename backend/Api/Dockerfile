#
# Build stage
#
FROM maven:3.8-amazoncorretto-19 AS build
COPY ./ /home/app/
RUN mvn -f /home/app/pom.xml clean package -U 

CMD ["bash"]
