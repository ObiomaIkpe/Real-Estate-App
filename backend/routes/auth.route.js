import express from 'express';
import { signup, signin, google, signout } from '../controllers/auth.controller.js';
const router = express.Router();

router.route('/sign-up').post(signup);
router.route('/sign-in').post(signin);
router.route('/google').post(google);
router.route('/sign-out').get(signout);




export default router; 