"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logging_1 = __importDefault(require("../helpers/Logging"));
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user_info').then((res) => {
    Logging_1.default.info("Database connected successfully");
}).catch((err) => {
    Logging_1.default.error(err);
});
module.exports = mongoose;
