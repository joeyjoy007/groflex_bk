"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {allRoutes } from "./routes";
const cors_1 = __importDefault(require("cors"));
const Logging_1 = __importDefault(require("./helpers/Logging"));
// import { allRoutes } from './routes'
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
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin,Content-Type,X-Requested-With,Accept,Authorization"
//     );
//     if (req.method == "OPTIONS") {
//         res.header(
//             "Access-Control-Allow-Methods",
//             "PUT,PATCH,GET,POST,DELETE"
//         );
//         return res.status(200).json({});
//     }
//     next();
// })
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));
app.use('/posts', express.static('posts'));
// allRoutes.map((e)=>{
//     return app.use(e.path,e.route)
// })
const server = app.listen(port, () => {
    Logging_1.default.info(`server is running on port ${port}`);
});
