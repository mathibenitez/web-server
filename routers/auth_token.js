import { Router } from "express";
import { SignJWT, jwtVerify } from "jose";
import { USERS_BBDD } from "../bbdd.js";
import authByEmailPassword from "../helpers/authByEmailPassword.js";


const authTokenRouter = Router();

authTokenRouter.post("/login", async (req, res)  =>  {
  const { email, password } = req.body;

  if(!email || !password) return res.sendStatus(400);

  try {
    const { guid } = authByEmailPassword(email, password);
  
    //Generate a token and return him
    const jwtConstructor = new SignJWT({ guid });

    //setIssuedAt = date of creation
    const encoder = new TextEncoder();
    const jwt = await jwtConstructor
    .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    return res.send(jwt);
  } catch (err) {
    return res.sendStatus(401);
  }
})

//Solicitud autenticada con sesion para obtener el perfil del usuario
authTokenRouter.get("/profile", async (req, res) => {
  const { authorization } = req.headers;

  if(!authorization) return res.statusCode(400);

  try {
    
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(authorization, encoder.encode(process.env.JWT_PRIVATE_KEY))

    const user = USERS_BBDD.find((user) => user.guid === payload.guid);

    if(!user) return res.sendStatus(401);

    delete user.password;

    return res.send(user);

  } catch (error) {
    return res.statusCode(401);
  }
  //Get header token and check authentic and expire

  
})

export default authTokenRouter;