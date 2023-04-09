import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME: string = process.env.MONGO_USERNAME || "mrkamilot";
const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD || "CiVMS3kAWkUC5myd";
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@shpp-node-js.g4pecu2.mongodb.net/?retryWrites=true&w=majority`;


const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3005;

export const config = {
    mongo: {
        username: MONGO_USERNAME,
        password: MONGO_PASSWORD,
        url: MONGO_URL,
    },
    server: {
        port: PORT,
    },
};