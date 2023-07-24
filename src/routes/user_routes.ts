import { Router } from "express";
import { createUser, deleteUser, getAllUser, getUserDetail, loginUser, searchUser, updateUser } from "../controllers/user_controller";


const router = Router()


router.route('/').post(createUser);
router.route('/login').post(loginUser);
router.route('/get').get(getAllUser);
router.route('/delete').patch(deleteUser);
router.route('/single').post(getUserDetail);
router.route('/search/:searchKey').post(searchUser);
router.route('/update').patch(updateUser);



module.exports = router