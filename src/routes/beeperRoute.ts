import express from "express";
import * as controllerFunctions from "../controller/beeperController"

const beeperRouter = express.Router();

beeperRouter.get('/api/beepers', controllerFunctions.getBeepers);

beeperRouter.get('/api/beepers/:id', controllerFunctions.getBeeperById);

beeperRouter.post('/api/beepers', controllerFunctions.addBeeperToDb);

export default beeperRouter