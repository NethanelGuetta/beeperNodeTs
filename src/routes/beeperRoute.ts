import express from "express";
import * as controllerFunctions from "../controller/beeperController"

const beeperRouter = express.Router();

beeperRouter.get('/api/beepers', controllerFunctions.getBeepers);

export default beeperRouter