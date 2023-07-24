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
exports.searchUser = exports.updateUser = exports.deleteUser = exports.getUserDetail = exports.getAllUser = exports.loginUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const Response_1 = require("../helpers/Response");
const Generate_tokens_1 = require("../helpers/Generate_tokens");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield user_model_1.default.find({ email: req.body.email });
        if (check.length > 0) {
            (0, Response_1.response)(400, 0, 'user already exist', 'user already exist', res);
        }
        else {
            const create = new user_model_1.default(req.body);
            if (create) {
                create.save();
                (0, Response_1.response)(201, 1, create, 'user created', res);
            }
            else {
                (0, Response_1.response)(400, 0, 'user not created', 'user not created', res);
            }
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'user not created', res);
    }
});
exports.createUser = createUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let token;
    try {
        if (!email || !password) {
            (0, Response_1.response)(400, 0, "Complete details", "Details not found", res);
        }
        else {
            const user = yield user_model_1.default.findOne({ email });
            if (!user) {
                (0, Response_1.response)(400, 0, "User not found", "User not found", res);
            }
            else {
                const matchPassword = yield user.comparePassword(password, res);
                if (!matchPassword) {
                    (0, Response_1.response)(400, 0, "Invalid credentials", "invalid credentials", res);
                }
                else {
                    token = yield (0, Generate_tokens_1.generateToken)(user._id);
                    (0, Response_1.response)(200, 1, { user, token }, "Login Successfull", res);
                }
            }
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, "User not found", res);
    }
});
exports.loginUser = loginUser;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchUser = yield user_model_1.default.find();
        if (searchUser.length > 0) {
            (0, Response_1.response)(200, 1, searchUser, 'user found', res);
        }
        else {
            (0, Response_1.response)(400, 0, 'user not found', 'user not found', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'user not found', res);
    }
});
exports.getAllUser = getAllUser;
const getUserDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const checkUser = yield user_model_1.default.findById(req.body._id);
        if (checkUser) {
            (0, Response_1.response)(200, 1, checkUser, 'user fetched', res);
        }
        else {
            (0, Response_1.response)(400, 0, 'user not found', 'user not found', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error, 'user not found', res);
    }
});
exports.getUserDetail = getUserDetail;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const deleteUser = yield user_model_1.default.findByIdAndDelete(req.body._id, { new: true });
        if (deleteUser) {
            (0, Response_1.response)(200, 1, deleteUser, 'user deleted', res);
        }
        else {
            (0, Response_1.response)(400, 0, 'user not deleted', 'user not deleted', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error, 'user not found', res);
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkUser = yield user_model_1.default.findByIdAndUpdate({ _id: req.body.userId }, req.body);
        if (checkUser) {
            (0, Response_1.response)(201, 1, checkUser, 'user updated', res);
        }
        else
            ((0, Response_1.response)(400, 0, 'user not updated', 'user not updated ', res));
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error, 'user not updated', res);
    }
});
exports.updateUser = updateUser;
const searchUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.searchKey);
    try {
        const searchUser = yield user_model_1.default.find({
            "$or": [
                { username: { $regex: req.params.searchKey } }
            ]
        });
        if (searchUser.length > 0) {
            (0, Response_1.response)(200, 1, searchUser, 'user found', res);
        }
        else {
            (0, Response_1.response)(400, 0, 'user not found', 'user not found', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'user not fetched', res);
    }
});
exports.searchUser = searchUser;
