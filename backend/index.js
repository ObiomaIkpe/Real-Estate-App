import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import connectDB from './CONNECT/connectDB.js';
import userRouter from './routes/user.routes.js';

const app = express();


const port = process.env.PORT || 4500;

app.use('/api/user', userRouter)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        const server = app.listen(port, () => console.log(`listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()