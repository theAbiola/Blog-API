import express from "express";
import env from "dotenv";
import routes from "./routes/blog.api.routes.js"

const app = express();
env.config();
const port = process.env.SERVER_PORT;

// Middleware
app.use(express.json()); //Necessary to parse incoming JSON response
app.use(express.urlencoded({ extended: true })); //middleware to parse url data

app.use(routes);

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
