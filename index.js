console.clear();
// import { createServer } from 'node:http';
import express from 'express';

const PORT = 3000;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());

expressApp.post("/cuenta/:idCuenta", (req, res) => {
console.log(req.body);

    res.send("Tu cuenta personal");
})

expressApp.put("/producto", (req, res) => {
console.log(req.body);

    res.send("Un producto");
})

expressApp.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));