console.clear();
// import { createServer } from 'node:http';
import express from 'express';

const PORT = 3000;
const expressApp = express();


expressApp.get("/cuenta/:idCuenta", (req, res) => {
    console.log(req.params.idCuenta)
    res.send("Tu cuenta personal");
})

expressApp.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));