import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import { userRoutes } from "./routes/userRoutes.js";
import { blogRoutes } from "./routes/blogRoutes.js";

//  ************** env config ***************
dotenv.config();

// @ dotenv.config()
// -----It's is used to load environment variables from a .env file into the Node.js environment

//  ************** mongodb connection ***************
connectDB();

//  ************** Express Framework instance created  ***************
const app = express();

// @ express()
// -----it returns a new instance of an Express application.
// -----This instance represents your web application and allows you to define middleware, routes
//      and other settings to handle incoming HTTP requests and generate responses

//  ************** middlewares ***************
app.use(cors());
app.use(json());
app.use(morgan("dev"));

// @ app.use()
// -----It's used to add the middlware functions in express application
// -----Perform various tasks like logging, parsing data

// @ cors()
// -----Imports the CORS middleware to enable Cross-Origin Resource Sharing
// -----If your application's frontend and backend are hosted on different domains or ports,
//      CORS enables the frontend to make requests to the backend without encountering cross-origin restrictions imposed by browsers.
// -----During development, you might have your frontend application running on one port (e.g., localhost:3000)
//      and your Express server running on another port (e.g., localhost:8080).
// -----Enabling CORS ensures that requests from the frontend to the backend are allowed during development

// @ json()
// -----The json() middleware is used to parse JSON bodies of incoming requests.
// -----It automatically parses the request body and makes it available as req.body in route handlers.

// @ morgan("dev")
// -----This enables request logging with the "dev" format.
// -----With morgan, each incoming request will be logged to the console, showing details such as request method, URL, status code, and response time.
// -----This logging helps in debugging, monitoring, and understanding the flow of requests in the application

//  ************** Route Handler ***************
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// @ simple route
// app.delete('/blog/:id', (req, res) => {
//   const blogId = req.params.id;
//   res.send(`Blog with ID ${blogId} deleted`);
// });

// @ app.use()
// -----Used to define route handlers specifically for HTTP GET requests to a particular path

// @ v1/
// -----versioning is used to backward compatability
// -----Backward Compatibility:
//      When you make changes to your API, you may introduce breaking changes that affect existing clients.
//      By versioning your API, you can introduce these changes in a new version while maintaining the existing version for clients that are not yet ready to upgrade.

//  ************** Server Listening ***************
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port ${process.env.DEV_MODE} ${PORT}`);
});

// @ app.listen()
// -----Used to start the Express server and listen for incoming requests on a specific port.
