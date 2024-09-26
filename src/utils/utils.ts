import { v4 as uuidv4 } from 'uuid';
import { locationsList } from '../models/locationList';

export function generateId() {
    return uuidv4();
}

export function changeStatus(status: string) {
    switch (status) {
        case "manufactured":
            return "assembled"
            break;
        case "assembled":
            return "shipped"
            break;
        case "shipped":
            return "deployed"
            break;
        case "deployed":
            return "detonated"
            break;
        default:
            break;
    }
}

export function checkPosition(longitude: number, latitude: number) {
    if (!locationsList.find((location) => location === longitude && location === latitude)) {
        return false;
    } else {
        return true;
    }
}