import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

//! Connect DB
connectDB();

//! Middleware
app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:5173'
    }
));
app.use(express.json());
app.use(cookieParser())

//! API Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})


