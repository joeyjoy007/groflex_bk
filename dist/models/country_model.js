"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const countrySchema = new mongoose_1.default.Schema({
    country: String,
    state: [{ type: mongoose_1.default.Types.ObjectId, ref: 'State' }]
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model("Country", countrySchema);
