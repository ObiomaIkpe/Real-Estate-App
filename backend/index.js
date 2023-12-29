import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 
dotenv.config()
import connectDB from './CONNECT/connectDB.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';

const app = express();
app.use(cookieParser());
app.use(express.json());

const port = process.env.PORT || 4500;

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        const server = app.listen(port, () => console.log(`listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();

app.use((err, req, res, next) => {
 const statusCode = err.statusCode || 500;
 const message = err.message || 'internal server error';
 
//  console.log(err)
 return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    
 })
 
})