import jsonFile from "jsonfile";
import { Beeper } from "../models/beeperInterface";

const dbFile = './db.json';

export async function gettAllBeepers(): Promise<Beeper[]> {
    try {
        const beepers = await jsonFile.readFile(dbFile);
        return beepers;
    } catch (error) {
        throw error;
    }
}

export async function getBeeperById(id: number): Promise<Beeper> {
    try {
        const beepers = await gettAllBeepers();
        const beeper = beepers.find((beeper: Beeper) => beeper.id === id);
        if (!beeper) {
            throw new Error(`Beeper with id ${id} not found`);
        }
        return beeper;
    } catch (error) {
        throw error;
    }
}

export async function addBeeper(newBeeper: Beeper): Promise<Beeper> {
    try {
        const beepers = await gettAllBeepers();
        beepers.push(newBeeper);
        await jsonFile.writeFile(dbFile, beepers);
        return newBeeper;
    } catch (error) {
        throw error;
    }
}

export async function updateStatusOfbeeper(id: number, status: string | undefined, latitude: number, longitude: number): Promise<Beeper> {
    try {
        const beepers = await gettAllBeepers();
        const beeper = beepers.find((beeper: Beeper) => beeper.id === id);
        if (!beeper) {
            throw new Error(`Beeper with id ${id} not found`);
        }
        if (status !== undefined) {
            beeper.status = status;
            beeper.latitude = latitude;
            beeper.longitude = longitude;
            if (status === 'detonated') {
                beeper.detonated_at = new Date();
            }
        }
        await jsonFile.writeFile(dbFile, beepers, { spaces: 2 });
        return beeper;
    } catch (error) {
        throw error;
    }
}

export async function deleteBeeperFromDb(id: Number): Promise<void> {
    try {
        const beepers = await gettAllBeepers();
        const index = beepers.findIndex((beeper: Beeper) => beeper.id === id);
        beepers.splice(index, 1);
        await jsonFile.writeFile(dbFile, beepers);
    } catch (error) {
        throw error;
    }
}

export async function getBeepersByStatus(status: string): Promise<Beeper[]> {
    try {
        const beepers = await gettAllBeepers();
        const filteredBeepers = beepers.filter((beeper: Beeper) => beeper.status === status);
        return filteredBeepers;
    } catch (error) {
        throw error;
    }
}
