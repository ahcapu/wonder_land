import path from "path";
import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
dotenv.config({ path: "./config/.env" });
import { createConnection } from "typeorm";
import { setup } from "./routes";

const app = express();

app.set("view engine", "pug");

app.set("views", path.join(__dirname, "views"));

app.use(
  fileUpload({
    // useTempFiles: true,
    // tempFileDir: path.join(__dirname, "../temp"),
    // limits: {fileSize: 2 * 1024}
  })
);

app.use(express.static(path.join(__dirname, "../public")));
createConnection();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

setup(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
