"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBeepersByStatus = exports.deleteBeeper = exports.updateStatus = exports.addBeeperToDb = exports.getBeeperById = exports.getBeepers = void 0;
const dbFunctions = __importStar(require("../dal/dal"));
const getBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield dbFunctions.gettAllBeepers();
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting beepers' });
    }
});
exports.getBeepers = getBeepers;
const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperId = +req.params.id;
    try {
        const beeper = yield dbFunctions.getBeeperById(beeperId);
        res.status(200).json(beeper);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting beeper' });
    }
});
exports.getBeeperById = getBeeperById;
const addBeeperToDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBeeper = {
        id: Date.now(),
        name: req.body.name,
        status: "manufactured",
        created_at: new Date(),
        detonated_at: req.body.detonated_at,
        longitude: req.body.longitude,
        latitude: req.body.latitude
    };
    try {
        dbFunctions.addBeeper(newBeeper);
        res.status(201).json(newBeeper);
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding beeper' });
    }
});
exports.addBeeperToDb = addBeeperToDb;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperId = +req.params.id;
    const status = req.body.status;
    try {
        const beeper = yield dbFunctions.updateStatusOfbeeper(beeperId, status);
        res.status(200).json(beeper);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating status of beeper' });
    }
    if (status === "deployed") {
        dbFunctions.timer(beeperId);
    }
});
exports.updateStatus = updateStatus;
const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeperId = +req.params.id;
    try {
        const beeper = yield dbFunctions.deleteBeeperFromDb(beeperId);
        res.status(200).json(beeper);
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting beeper' });
    }
});
exports.deleteBeeper = deleteBeeper;
const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    try {
        const beepers = yield dbFunctions.getBeepersByStatus(status);
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting beepers' });
    }
});
exports.getBeepersByStatus = getBeepersByStatus;
