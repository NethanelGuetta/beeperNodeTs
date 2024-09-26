import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
app.use(express.json());

const PORT: number | string = process.env.PORT || "3001";

//import routes
import beeperRouter from "./routes/beeperRoute";
app.use(beeperRouter);

//listen and start the server
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
})  