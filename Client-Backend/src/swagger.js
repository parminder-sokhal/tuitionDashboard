import swaggerAutogen from "swagger-autogen";
import logger from "./logger/winston.logger.js";

const doc = {
  info: {
    title: "My API",
    description: "Description",
  },
  host: "localhost:5500",
  basePath: "/api/v1",
};

const outputFile = "./swagger-output.json";
const routes = [
  // "./routes/auth.route.js",
  "./routes/user.route.js",
  "./routes/area.route.js",
  "./routes/city.route.js",
  "./routes/contactForm.route.js",
  "./routes/teacher.route.js",
  "./routes/subject.route.js",
  

  
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(() => {
  logger.info("Swagger file has been generated");
  // import  ("./index.js"); // Auto Run your project
});
