import { Router } from "express";
import authByEmailPassword from "../helpers/authByEmailPassword.js";
import { SignJWT } from "jose";
const authTokenRouter = Router();

authTokenRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailPassword(email, password);
  
    //Generate a token and return him
    const jwtConstructor = new SignJWT({ guid });

    //setIssuedAt = date of creation
    const jwt = jwtConstructor
    .setProtectedHeader({alg: 'HS256', type: 'JWT'})
    .setIssuedAt()
    .setExpirationTime()

    return res.send(`User ${user.name} authentic`);
  } catch (err) {
    return res.sendStatus(401);
  }
})

//Solicitud autenticada con sesion para obtener el perfil del usuario
authTokenRouter.get("/profile", (req, res) => {
  const { cookies } = req;

  if(!cookies.sessionId) return res.sendStatus(401);

  const userSession = sessions.find((session) => session.sessionId === cookies.sessionId);
  
  console.log('hi');
  if(!userSession) return res.sendStatus(401);

  const user = USERS_BBDD.find((user) => user.guid === userSession.guid);

  if(!user) return res.sendStatus(401);

  delete user.password;

  return res.send(user);
})

export default authTokenRouter;