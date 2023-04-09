import express, { Express } from "express";
import mongoose, { ObjectId } from "mongoose";
import bodyParser from "body-parser";
import { config } from "./db/db_config";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { join } from "path";

import api_v1 from "./routers/router_v1";
import api_v2 from "./routers/router_v2";

declare module "express-session" {
    export interface SessionData {
        userId: ObjectId;
    }
}

mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log("MongoDB connected!")
        startServer();
    })
    .catch((err) => console.log(err))

const startServer: Function = () => {
    const app: Express = express();

    app.use(express.static("static"));
    app.use(bodyParser.json());

    app.use(session({
        store: MongoStore.create({ mongoUrl: config.mongo.url }),
        secret: 'shpp_node_js',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 3600 * 5,
            httpOnly: true
        }
    }));
    // app.use(cors());
    app.use("/api/v1", api_v1);
    app.use("/api/v2/router", api_v2);

    app.listen(config.server.port, () => {
        console.log(`Example app listening on port ${config.server.port}`)
    });
};




