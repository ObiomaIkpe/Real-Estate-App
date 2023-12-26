import express from 'express';
const router = express.Router();
import { test } from '../controllers/user.controller.js'

router.route('/test').get(test)

export default router