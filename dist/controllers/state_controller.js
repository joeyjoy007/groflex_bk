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
exports.getAllState = exports.createState = void 0;
const state_model_1 = __importDefault(require("../models/state_model"));
const Response_1 = require("../helpers/Response");
const country_model_1 = __importDefault(require("../models/country_model"));
const createState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const create_state = new state_model_1.default(req.body);
        if (create_state) {
            create_state.save();
            const update_country_state = yield country_model_1.default.findByIdAndUpdate({ _id: req.body.country }, {
                $push: { state: create_state._id }
            });
            if (update_country_state) {
                (0, Response_1.response)(201, 1, create_state, 'state created and country_state_updated', res);
            }
            else {
                (0, Response_1.response)(400, 0, 'country_state_not_updated', 'state created but country_state_not_updated', res);
            }
        }
        else {
            (0, Response_1.response)(400, 0, 'state not created', 'state not created', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'state not created', res);
    }
});
exports.createState = createState;
const getAllState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get_state = yield state_model_1.default.find();
        if (get_state) {
            (0, Response_1.response)(201, 1, get_state, 'state fetched', res);
        }
        else {
            (0, Response_1.response)(400, 0, 'state not fetched', 'state not fetched', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'state not fetched', res);
    }
});
exports.getAllState = getAllState;
