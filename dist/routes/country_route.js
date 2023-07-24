"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_controller_1 = require("../controllers/country_controller");
const router = (0, express_1.Router)();
router.route('/').post(country_controller_1.createCountry);
router.route('/get').get(country_controller_1.getAllCountry);
module.exports = router;
