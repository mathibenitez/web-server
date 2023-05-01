import { Router } from 'express'
import authByEmailPassword from '../helpers/authByEmailPassword.js';

const authRouter = Router();

//Endpoint public, not required authorization or authentication
authRouter.get("/public", (req, res) => res.send('public endpoint'));

//Endopoint autho and authe
authRouter.post("/authentic", (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPassword(email, password);
  
    return res.send(`User ${user.name} authentic`);
  } catch (error) {
    return res.sendStatus(401);
  }
})

authRouter.post("/authorize", (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.sendStatus(400);

  try {
    const user = authByEmailPassword(email, password);
  
    if(user.role !== 'admin') return res.sendStatus(403)
  
    return res.send(`User admin ${user.name} authorize`);
  } catch (error) {
    return res.sendStatus(401);
  }
})
export default authRouter;