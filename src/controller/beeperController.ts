import express, { Request, Response } from "express";
import * as dbFunctions from "../dal/dal";
import {Beeper} from "../models/beeperInterface";
import * as utils from "../utils/utils";


export const getBeepers = async (req:Request, res:Response) => {
    try {
        const beepers = await dbFunctions.gettAllBeepers();
         res.status(200).json(beepers)
    } catch (error) {
        res.status(500).json({ message: 'Error getting beepers' });
    }
}

export const getBeeperById = async (req:Request, res:Response) => {
    const beeperId: Number = + req.params.id;
    try {
        const beeper = await dbFunctions.getBeeperById(beeperId);
        res.status(200).json(beeper)
    } catch (error) {
        res.status(500).json({ message: 'Error getting beeper' });
    }
}

export const addBeeperToDb = async (req:Request, res:Response) => {
    const newBeeper: Beeper = {
        id: Date.now(),
        name: req.body.name,
        status: req.body.status,
        created_at: new Date(),
        detonated_at: req.body.detonated_at,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    };
    try {
        dbFunctions.addBeeper(newBeeper);
        res.status(201).json(newBeeper);
    } catch (error) {
        res.status(500).json({ message: 'Error adding beeper' });
    }
}