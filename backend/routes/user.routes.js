import express from 'express';
const router = express.Router(); 
import { test, updateUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

router.route('/test').get(test)
router.route('/update/:id').post(verifyToken, updateUser);
router.route('/delete/:id').delete( deleteUser);



export default router;