import dotenv from 'dotenv';
import express from 'express';
import accountRouter from './routers/account.js';

dotenv.config();

const PORT = process.env.PORT;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use('/account', accountRouter);

expressApp.get('/root', (req, res) => {
  res.send(console.log('Hi'));
})

expressApp.listen(PORT, () => console.log(`Server up in port: ${PORT}`));