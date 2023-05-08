import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import accountRouter from './routers/account.js';
import authRouter from './routers/auth.js';
import authSessionRouter from './routers/auth_session.js';
import authTokenRouter from './routers/auth_token.js';

dotenv.config();

const PORT = process.env.PORT;
const expressApp = express();

expressApp.use(cookieParser());
expressApp.use(express.json());
expressApp.use(express.text());

expressApp.use('/account', accountRouter);

expressApp.use('/auth', authRouter);

expressApp.use('/auth-token', authTokenRouter);
expressApp.use('/auth-session', authSessionRouter);

const bootstrap = async () => {
    await mongoose.connect(process.env.MONGODB_URL);

    expressApp.listen(PORT, () => console.log(`Server up in port: ${PORT}`));
}

bootstrap();