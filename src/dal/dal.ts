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

export async function getBeeperById(id: Number) {
    try {
        const beepers = await  gettAllBeepers();
        const beeper = beepers.find((beeper: Beeper) => beeper.id === id);
        return beeper;
    } catch (error) {
        throw error;
    }
}

export async function addBeeper(newBeeper: Beeper) {
    try {
        const beepers = await gettAllBeepers();
        beepers.push(newBeeper);
        await jsonFile.writeFile(dbFile, beepers);
        return newBeeper;
    } catch (error) {
        throw error;
    }
}