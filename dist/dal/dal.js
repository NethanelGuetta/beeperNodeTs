"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gettAllBeepers = gettAllBeepers;
exports.getBeeperById = getBeeperById;
exports.addBeeper = addBeeper;
exports.updateStatusOfbeeper = updateStatusOfbeeper;
exports.deleteBeeperFromDb = deleteBeeperFromDb;
exports.getBeepersByStatus = getBeepersByStatus;
const jsonfile_1 = __importDefault(require("jsonfile"));
const dbFile = './db.json';
function gettAllBeepers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield jsonfile_1.default.readFile(dbFile);
            return beepers;
        }
        catch (error) {
            throw error;
        }
    });
}
function getBeeperById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield gettAllBeepers();
            const beeper = beepers.find((beeper) => beeper.id === id);
            if (!beeper) {
                throw new Error(`Beeper with id ${id} not found`);
            }
            return beeper;
        }
        catch (error) {
            throw error;
        }
    });
}
function addBeeper(newBeeper) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield gettAllBeepers();
            beepers.push(newBeeper);
            yield jsonfile_1.default.writeFile(dbFile, beepers);
            return newBeeper;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateStatusOfbeeper(id, status, latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield gettAllBeepers();
            const beeper = beepers.find((beeper) => beeper.id === id);
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
            yield jsonfile_1.default.writeFile(dbFile, beepers, { spaces: 2 });
            return beeper;
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteBeeperFromDb(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield gettAllBeepers();
            const index = beepers.findIndex((beeper) => beeper.id === id);
            beepers.splice(index, 1);
            yield jsonfile_1.default.writeFile(dbFile, beepers);
        }
        catch (error) {
            throw error;
        }
    });
}
function getBeepersByStatus(status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const beepers = yield gettAllBeepers();
            const filteredBeepers = beepers.filter((beeper) => beeper.status === status);
            return filteredBeepers;
        }
        catch (error) {
            throw error;
        }
    });
}
