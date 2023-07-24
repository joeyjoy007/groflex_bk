import { Router } from "express";
import { createState, getAllState } from "../controllers/state_controller";
import { createCountry, getAllCountry } from "../controllers/country_controller";


const router = Router()


router.route('/').post(createCountry);
router.route('/get').get(getAllCountry);



module.exports = router