import jsonFile from "jsonfile";
import { Beeper } from "../models/beeperInterface";

const dbFile = './db.json';

export async function gettAllBeepers() {
    try {
        const beepers = await jsonFile.readFile(dbFile);
        return beepers;
    } catch (error) {
        throw error;
    }
}