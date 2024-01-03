import express from 'express';
const router = express.Router(); 
import { test, updateUser, deleteUser, getUserListing, getUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

router.route('/test').get(test);
router.route('/update/:id').post(verifyToken, updateUser);
router.route('/delete/:id').delete(verifyToken, deleteUser);
router.route('/listings/:id').get(verifyToken, getUserListing);
router.route('/:id').get(verifyToken, getUser);







export default router;