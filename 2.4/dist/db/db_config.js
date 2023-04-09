"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || "mrkamilot";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "CiVMS3kAWkUC5myd";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@shpp-node-js.g4pecu2.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT ? Number(process.env.PORT) : 3005;
exports.config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL,
    },
    server: {
        port: PORT,
    },
};
//# sourceMappingURL=db_config.js.map