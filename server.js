import express from "express";
import env from "dotenv";
import routes from "./routes/blogRoutes.js"

const app = express();
env.config();
const port = process.env.SERVER_PORT;

// Middleware
app.use(express.json()); //Necessary to parse incoming JSON response
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
