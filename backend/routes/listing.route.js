import express from 'express';
const router = express.Router();
import {createListing, updateListing, deleteListing, getListing, getListings} from '../controllers/listing.controller.js';
import {verifyToken } from '../utils/verifyUser.js'

router.route('/create').post(verifyToken, createListing);
router.route('/delete/:id').delete(verifyToken, deleteListing);
router.route('/update/:id').patch(verifyToken, updateListing);
router.route('/get/:id').get(getListing); 
router.route('/get').get(getListings)



export default router 

