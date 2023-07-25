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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    email: { type: String, unique: true },
    city: String,
    gender: String,
    zip_code: String,
    profile: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
    state: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "State"
    },
    country: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Country"
    },
    password: String,
    dob: String,
    interest: [
        { type: String,
            enum: ['Writing', 'Travelling', 'Playing']
        }
    ]
}, {
    timestamps: true
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password")) {
            return next(null);
        }
        else {
            this.password = yield bcrypt_1.default.hash(this.password, 10);
        }
    });
});
userSchema.methods.comparePassword = function (password, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const matchPassword = yield bcrypt_1.default.compare(password, this.password);
        return matchPassword;
    });
};
exports.default = mongoose_1.default.model("User", userSchema);
