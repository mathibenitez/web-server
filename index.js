import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import accountRouter from './routers/account.js';
import authRouter from './routers/auth.js';
import authTokenRouter from './routers/auth_token.js';
import authSessionRouter from './routers/auth_session.js';

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

expressApp.listen(PORT, () => console.log(`Server up in port: ${PORT}`));