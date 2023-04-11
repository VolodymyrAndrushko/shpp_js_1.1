"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_config_1 = require("./db/db_config");
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const path_1 = require("path");
const router_v1_1 = __importDefault(require("./routers/router_v1"));
const router_v2_1 = __importDefault(require("./routers/router_v2"));
mongoose_1.default
    .connect(db_config_1.config.mongo.url)
    .then(() => {
    console.log("MongoDB connected!");
    startServer();
})
    .catch((err) => console.log(err));
const startServer = () => {
    const app = (0, express_1.default)();
    // app.use(express.static("static"));
    app.use(express_1.default.static((0, path_1.join)(__dirname, "../static/version2/")));
    app.use(body_parser_1.default.json());
    app.use((0, express_session_1.default)({
        store: connect_mongo_1.default.create({ mongoUrl: db_config_1.config.mongo.url }),
        secret: 'shpp_node_js',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 3600 * 5,
            httpOnly: true
        }
    }));
    // app.use(cors());
    app.use("/api/v1", router_v1_1.default);
    app.use("/api/v2/router", router_v2_1.default);
    app.listen(db_config_1.config.server.port, () => {
        console.log(`Example app listening on port ${db_config_1.config.server.port}`);
    });
};
//# sourceMappingURL=server.js.map