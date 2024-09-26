import express, { Request, Response } from "express";
import * as dbFunctions from "../dal/dal";
import {Beeper} from "../models/beeperInterface";

export const getBeepers = async (req:Request, res:Response) => {
    try {
        const beepers = await dbFunctions.gettAllBeepers();
         res.status(200).json(beepers)
    } catch (error) {
        res.status(500).json({ message: 'Error getting beepers' });
    }
}