import express from "express";
import * as controllerFunctions from "../controller/beeperController"

const beeperRouter = express.Router();

beeperRouter.get('/api/beepers', controllerFunctions.getBeepers);

beeperRouter.get('/api/beepers/:id', controllerFunctions.getBeeperById);

beeperRouter.post('/api/beepers', controllerFunctions.addBeeperToDb);

beeperRouter.put('/api/beepers/:id/status', controllerFunctions.updateStatus);

beeperRouter.delete('/api/beepers/:id', controllerFunctions.deleteBeeper);

beeperRouter.get('/api/beepers/status/:status', controllerFunctions.getBeepersByStatus);

export default beeperRouter;