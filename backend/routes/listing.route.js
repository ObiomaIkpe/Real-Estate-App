import express from 'express';
const router = express.Router();
import {createListing, deleteListing} from '../controllers/listing.controller.js';
import {verifyToken } from '../utils/verifyUser.js'

router.route('/create').post(verifyToken, createListing);
router.route('/delete/:id').delete(verifyToken, deleteListing);


export default router 

