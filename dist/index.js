"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const Logging_1 = __importDefault(require("./helpers/Logging"));
const routes_1 = require("./routes");
const express = require('express');
const app = express();
const port = 4000 || process.env.PORT;
require('./config/database');
app.use((req, res, next) => {
    Logging_1.default.info(`Incoming => Method :[${req.method}] - Url :[${req.url}] = IP [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        Logging_1.default.info(`Incoming => Method :[${req.method}] - Url :[${req.url}] = IP [${req.socket.remoteAddress}] -Status :[${req.statusCode}]`);
    });
    next();
});
app.use((0, cors_1.default)());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
routes_1.allRoutes.map((e) => {
    return app.use(e.path, e.route);
});
const server = app.listen(port, () => {
    Logging_1.default.info(`server is running on port ${port}`);
});
