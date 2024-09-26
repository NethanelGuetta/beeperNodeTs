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

export async function updateStatusOfbeeper(id: Number, status: string) {
    try {
        const beepers = await gettAllBeepers();
        const beeper = beepers.find((beeper: Beeper) => beeper.id === id);
        beeper.status = status;
        await jsonFile.writeFile(dbFile, beepers);
        return beeper;
    } catch (error) {
        throw error;
    }
}

export async function deleteBeeperFromDb(id: Number) {
    try {
        const beepers = await gettAllBeepers();
        const index = beepers.findIndex((beeper: Beeper) => beeper.id === id);
        beepers.splice(index, 1);
        await jsonFile.writeFile(dbFile, beepers);
    } catch (error) {
        throw error;
    }
}

export async function getBeepersByStatus(status: string) {
    try {
        const beepers = await gettAllBeepers();
        const filteredBeepers = beepers.filter((beeper: Beeper) => beeper.status === status);
        return filteredBeepers;
    } catch (error) {
        throw error;
    }
}

export function timer(id: Number) {
    let countdown = 10;
    
    const timer = setInterval(() => {
        if (countdown >= 0) {
            countdown--;
        } else {
            clearInterval(timer);
            updateStatusOfbeeper(id, 'detonated');
        }
    }, 1000);
}