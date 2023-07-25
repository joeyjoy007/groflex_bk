"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const state_controller_1 = require("../controllers/state_controller");
const router = (0, express_1.Router)();
router.route('/').post(state_controller_1.createState);
router.route('/get').post(state_controller_1.getAllState);
module.exports = router;
