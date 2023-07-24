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
exports.getAllCountry = exports.createCountry = void 0;
const state_model_1 = __importDefault(require("../models/state_model"));
const Response_1 = require("../helpers/Response");
const country_model_1 = __importDefault(require("../models/country_model"));
const createCountry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const create_country = new country_model_1.default(req.body);
        if (create_country) {
            create_country.save();
            (0, Response_1.response)(201, 1, create_country, 'country created', res);
        }
        else {
            (0, Response_1.response)(400, 0, 'country not created', 'country not created', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'country not created', res);
    }
});
exports.createCountry = createCountry;
const getAllCountry = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get_country = yield state_model_1.default.find();
        if (get_country) {
            (0, Response_1.response)(201, 1, get_country, 'country fetched', res);
        }
        else {
            (0, Response_1.response)(400, 0, 'country not fetched', 'country not fetched', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'country not fetched', res);
    }
});
exports.getAllCountry = getAllCountry;
