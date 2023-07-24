import { Router } from "express";
import { createState, getAllState } from "../controllers/state_controller";


const router = Router()


router.route('/').post(createState);
router.route('/get').get(getAllState);



module.exports = router