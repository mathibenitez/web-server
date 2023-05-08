import { Router } from 'express';
import userModel from '../schemas/user-schema.js';


const accountRouter = Router();

//middleware to ip log
accountRouter.use((req, res, next) => {
  console.log(req.ip);

  next();
})

//Get details form account
accountRouter.get('/:guid', async (req, res) => {
  const { guid } = req.params;
  const user = await userModel.findById(guid).exec();

  if(!user) return res.status(404).send();

  return res.send(user);
})

//Create account
accountRouter.post('/', async (req, res) => {
  const { guid, name } = req.body;

  if(!guid || !name) return res.state(400).send();

  const user = await userModel.findById(guid).exec();
  
  if(user) return res.status(409).send('User already exists');
  
  const newUser = new userModel({_id: guid, name});
  await newUser.save();

  return res.send('User successfully registered');
})

//Update name of account
accountRouter.patch('/:guid', async (req, res) => {
  const { guid } = req.params;
  const { name } = req.body;

  if(!name) return res.state(400).send();

  const user = await userModel.findById(guid).exec();

  if(!user) return res.status(404).send();
  
  user.name = name;

  await user.save();

  return res.send();
})

//Delete account
accountRouter.delete('/:guid', async (req, res) => {
  const { guid } = req.params;
  const user = await userModel.findById(guid).exec();
  
  if(!user) return res.status(404).send();

  await user.deleteOne();

  return res.send();
})

export default accountRouter;