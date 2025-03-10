import express from "express";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import ErrorMiddleware from "./middlewares/Error.js";
import morganMiddleware from "./logger/morgan.logger.js";
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger-output.json' assert {type:'json'};
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import YAML from "yaml";


config({
    path: "./config/config.env",
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const file = fs.readFileSync(path.resolve(__dirname, "./swagger.yaml"), "utf8");
const swaggerDocument = YAML.parse(
  file?.replace(
    "- url: ${{server}}",
    `- url: ${process.env.CLIENTAPP_HOST_URL || "http://localhost:5500"}/api/v1`
  )
);

const app = express();

//loger
app.use(morganMiddleware);

const corsOptions = {
  origin: [process.env.LOCALHOST_URL, process.env.FRONTEND_URL], // Allows all origins
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true, // Allows cookies and other credentials to be sent with the request
};



app.use(cors(corsOptions)); // Enable CORS for all origins

//using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
      extended: true,
  })
)

app.use(cookieParser());

// Importing & using Routes
import UserRouter from "./routes/user.route.js";
import areaRoutes from "./routes/area.route.js";
import cityRoutes from "./routes/city.route.js";
import contactFormRoutes from "./routes/contactForm.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import studentRoutes from "./routes/student.route.js";
import subjectRoutes from "./routes/subject.route.js";

app.use("/api/v1", UserRouter);
app.use("/api/v1", areaRoutes);
app.use("/api/v1", cityRoutes);
app.use("/api/v1", contactFormRoutes);
app.use("/api/v1", teacherRoutes);
app.use("/api/v1", studentRoutes);
app.use("/api/v1", subjectRoutes);



// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: {
      docExpansion: "none", // keep all the sections collapsed by default
    },
    customSiteTitle: "Client Home Tuition App API docs",
  })
);
export default app;

app.use(ErrorMiddleware);