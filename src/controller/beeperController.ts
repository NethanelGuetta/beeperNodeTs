import express, { Request, Response } from "express";
import * as dbFunctions from "../dal/dal";
import { Beeper } from "../models/beeperInterface";
import * as utils from "../utils/utils";

export const getBeepers = async (req: Request, res: Response) => {
    try {
        const beepers = await dbFunctions.gettAllBeepers();
        res.status(200).json(beepers)
    } catch (error) {
        res.status(500).json({ message: 'Error getting beepers' });
    }
}

export const getBeeperById = async (req: Request, res: Response) => {
    const beeperId: number = + req.params.id;
    try {
        const beeper = await dbFunctions.getBeeperById(beeperId);
        res.status(200).json(beeper)
    } catch (error) {
        res.status(500).json({ message: 'Error getting beeper' });
    }
}

export const addBeeperToDb = async (req: Request, res: Response) => {
    const newBeeper: Beeper = {
        id: Date.now(),
        name: req.body.name,
        status: "manufactured",
        created_at: new Date(),
        // latitude: req.body.latitude,
        // longitude: req.body.longitude
    };
    try {
        dbFunctions.addBeeper(newBeeper);
        res.status(201).json(newBeeper);
    } catch (error) {
        res.status(500).json({ message: 'Error adding beeper' });
    }
}

export const updateStatus = async (req: Request, res: Response) => {
    const beeperId: number = + req.params.id;
    const latitude: number = req.body.latitude;
    const longitude: number = req.body.longitude;
    if (!utils.checkPosition(longitude, latitude)) {
        throw new Error('Latitude and longitude out of range');
    }
    try {
        const beeper: Beeper = await dbFunctions.getBeeperById(beeperId);
        const status = utils.changeStatus(beeper.status);
        const updatedBeeper = await dbFunctions.updateStatusOfbeeper(beeperId, status, latitude, longitude);
        res.status(200).json(updatedBeeper);
        if (status === "deployed") {
            if (!req.body.latitude || !req.body.longitude) {
                throw new Error('You have to send latitude and longitude');
            }
            setTimeout(async () => {
                await dbFunctions.updateStatusOfbeeper(beeperId, "detonated", latitude, longitude);
            }, 10000);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating status of beeper' });
    }
}

export const deleteBeeper = async (req: Request, res: Response) => {
    const beeperId: Number = + req.params.id;
    try {
        const beeper = await dbFunctions.deleteBeeperFromDb(beeperId);
        res.status(200).json(beeper)
    } catch (error) {
        res.status(500).json({ message: 'Error deleting beeper' });
    }
}

export const getBeepersByStatus = async (req: Request, res: Response) => {
    const status: string = req.params.status;
    try {
        const beepers = await dbFunctions.getBeepersByStatus(status);
        res.status(200).json(beepers)
    } catch (error) {
        res.status(500).json({ message: 'Error getting beepers' });
    }
}