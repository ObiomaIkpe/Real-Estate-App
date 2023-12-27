import express from 'express';
import { signup, signin, google } from '../controllers/auth.controller.js';
const router = express.Router();

router.route('/sign-up').post(signup);
router.route('/sign-in').post(signin);
router.route('/google').post(google);



export default router; 