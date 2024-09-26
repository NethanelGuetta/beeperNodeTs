import express, { Application } from "express";

const app:Application = express();
app.use(express.json());

const PORT = 3000;

//import routes
import beeperRouter from "./routes/beeperRoute";
app.use(beeperRouter);

//listen and start the server
app.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);  
  })  