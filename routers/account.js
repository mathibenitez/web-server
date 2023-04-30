import express from 'express';
import { USERS_BBDD } from '../bbdd.js';


const accountRouter = express.Router();

accountRouter.use((req, res, next) => {
  console.log(req.ip);

  next();
})

//Get details form account
accountRouter.get('/:guid', (req, res) => {
  const { guid } = req.params;
  const user = USERS_BBDD.find(user => user.guid === guid);

  if(!user) return res.status(404).send();

  return res.send(user);
})
//Create account
accountRouter.post('/', (req, res) => {
  const { guid, name } = req.body;

  if(!guid || !name) return res.state(400).send();

  const user = USERS_BBDD.find((user) => user.guid === guid);
  if(user) return res.status(409).send();

  USERS_BBDD.push({
    guid,
    name
  });

  return res.send();
})

//Update name of account
accountRouter.patch('/:guid', (req, res) => {
  const { guid } = req.params;
  const name = req.body;

  if(!name) return res.state(400).send();

  const user = USERS_BBDD.find(user => user.guid === guid);

  if(!user) return res.status(404).send();
  
  user.name = name;

  return res.send(user);
})

//Delete account
accountRouter.delete('/:guid', (req, res) => {
  const { guid } = req.params;
  const userIndex = USERS_BBDD.findIndex(user => user.guid === guid);
  
  if(userIndex === -1) return res.status(404).send();

  USERS_BBDD.splice(userIndex, 1);

  return res.send();
})

export default accountRouter;