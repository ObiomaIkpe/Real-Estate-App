import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs';
import User from "../models/User.models.js";
import Listing from '../models/listing.model.js'





export const test = (req, res) => {
    res.status(200).json({
        message: "hello world"
    })
}






export const updateUser = async(req, res, next) => {


    if (req.user.id !== req.params.id) return next(errorHandler('you are not authenticated', 401));
    try {
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {$set: 
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar
        }, 
    }, {new:true});


        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        console.log(error)
        next(error)
    }
}




export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler('Only the user can delete his/her account', 403));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('accesstoken')
        res.status(200).json({
            message: 'user deleted succefully'
        })
    } catch (error) {
        next(error)
    }
}


export const getUserListing = async (req, res, next) => {
    if (req.user.id === req.params.id){
        try {
            const listings = await Listing.find({userRef: req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        }
    }else{
        return next(errorHandler(401,'Unathorized!'))
    }
}

export const getUser = async (req, res, next) => {
    try{
    const user = await User.findById(req.params.id);

    if(!user) return next(errorHandler(404, 'user not found'))

    const { password: pass, ...rest} = user._doc;

    res.status(200).json(rest);
    } catch (error) {
        next(error); 
    }
};