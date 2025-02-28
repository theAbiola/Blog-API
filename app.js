import express from "express";
import env from "dotenv";
import routes from "./routes/blogAppRoutes.js";

const app = express();
env.config();

const port = process.env.APPLICATION_PORT;

app.use(express.static("public")); //allows us save static files in the public folder

app.use(express.urlencoded({ extended: true })); //Necessary to parse other formats of data as urlencoded data

app.use(routes);

app.listen(port, () => {
  console.log(`Application is running on http://localhost:${port}`);
});
