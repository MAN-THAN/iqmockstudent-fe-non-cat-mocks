### IQMockStudent frontend Application Docker
FROM node:16.20 as iqmockstudent-fe-sec-prod
# Set the working directory
WORKDIR /usr/local/iqmockstudent-fe-sec-prod
# Add the source code to app
COPY . /usr/local/iqmockstudent-fe-sec-prod

# Install all the dependencies
RUN npm install -g npm@9.6.7
RUN npm install --save react react-dom react-scripts
#RUN npm install
# Generate the build of the application
RUN npm run build
# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:1.24
RUN apt-get update
RUN apt-get install -y vim
RUN mkdir /usr/share/nginx/html/build
COPY --from=iqmockstudent-fe-sec-prod /usr/local/iqmockstudent-fe-sec-prod/build /usr/share/nginx/html/build/
RUN chmod -R 755 /usr/share/nginx/html/build/
RUN chown -R nginx:nginx /usr/share/nginx/html/build/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./iqmockstudent-fe-sec-prod.conf /etc/nginx/conf.d/
EXPOSE 80
