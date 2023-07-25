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
exports.page_controller = exports.searchUser = exports.updateUser = exports.deleteUser = exports.getUserDetail = exports.getAllUser = exports.reset_password_by_mail = exports.reset_password = exports.loginUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const Response_1 = require("../helpers/Response");
const Generate_tokens_1 = require("../helpers/Generate_tokens");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
            const user = yield user_model_1.default.findOne({ email }).populate('state country');
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
const reset_password = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pass = yield user_model_1.default.findByIdAndUpdate({ _id: req.body.userId }, {
            password: yield bcrypt_1.default.hash(req.body.password, 10)
        });
        if (pass) {
            (0, Response_1.response)(200, 1, pass, 'password updated', res);
        }
        else {
            (0, Response_1.response)(400, 0, pass, 'password not updated', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'password not updated', res);
    }
});
exports.reset_password = reset_password;
const reset_password_by_mail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const check = yield user_model_1.default.find({ email: (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email });
        if (check.length > 0) {
            console.log(check.length);
            const update = yield user_model_1.default.findByIdAndUpdate({ _id: check[0]._id }, {
                password: yield bcrypt_1.default.hash(req.body.password, 10)
            });
            if (update) {
                (0, Response_1.response)(200, 1, update, 'password updated', res);
            }
            else {
                (0, Response_1.response)(400, 0, "passwords not updated", 'password not updated', res);
            }
        }
        else {
            (0, Response_1.response)(400, 0, 'mail not found', 'mail not found', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'password not updated', res);
    }
});
exports.reset_password_by_mail = reset_password_by_mail;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchUser = yield user_model_1.default.find().populate('country state');
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
    console.log(req.body.userId);
    try {
        const checkUser = yield user_model_1.default.findByIdAndUpdate({ _id: req.body.userId }, req.body);
        console.log(checkUser);
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
const page_controller = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const page = req.body.page || 1;
        const limit = req.body.limit || 5;
        const skip = (page - 1) * limit;
        const count = yield user_model_1.default.find().count();
        const pagination = yield user_model_1.default.find().skip(skip).limit(limit).populate('state country');
        if (pagination) {
            (0, Response_1.response)(200, 1, { pagination, count }, 'paginated', res);
        }
        else {
            (0, Response_1.response)(400, 0, 'page error', 'page error', res);
        }
    }
    catch (error) {
        (0, Response_1.response)(400, 0, error.message, 'page error', res);
    }
});
exports.page_controller = page_controller;
