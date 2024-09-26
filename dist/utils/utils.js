"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
exports.changeStatus = changeStatus;
exports.checkPosition = checkPosition;
const uuid_1 = require("uuid");
const locationList_1 = require("../models/locationList");
function generateId() {
    return (0, uuid_1.v4)();
}
function changeStatus(status) {
    switch (status) {
        case "manufactured":
            return "assembled";
            break;
        case "assembled":
            return "shipped";
            break;
        case "shipped":
            return "deployed";
            break;
        case "deployed":
            return "detonated";
            break;
        default:
            break;
    }
}
// export function checkBody(body: any) {}
function checkPosition(longitude, latitude) {
    if (!locationList_1.locationsList.find((location) => location === longitude && location === latitude)) {
        return false;
    }
    else {
        return true;
    }
}
