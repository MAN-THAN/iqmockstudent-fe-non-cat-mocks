### IQMockStudent frontend Application Docker
FROM node:16.20 as iqmockstudent-fe-stg
# Set the working directory
WORKDIR /usr/local/iqmockstudent-fe-stg
# Add the source code to app
COPY . /usr/local/iqmockstudent-fe-stg

# Install all the dependencies
#RUN npm install -g @angular/cli
#RUN npm install -g npm@9.6.7
#RUN rm -f package-lock.json
#RUN npm install @material-ui/core
RUN node --version
RUN npm --version
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
COPY --from=iqmockstudent-fe-stg /usr/local/iqmockstudent-fe-stg/build /usr/share/nginx/html/build/
RUN chmod -R 755 /usr/share/nginx/html/build/
RUN chown -R nginx:nginx /usr/share/nginx/html/build/
RUN rm /etc/nginx/conf.d/default.conf
COPY ./iqmockstudent-fe-stg.conf /etc/nginx/conf.d/
EXPOSE 80

