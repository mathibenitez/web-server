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





// const httpServer = createServer((req, res) =>{

//     // console.log(req.method);
//     // console.log(req.url);
//     // console.log(req.headers);

//     let data = "";
//     let chunkIndex = 0;
//     req.on('data', (chunk) => {
//         data += chunk;
//         chunkIndex++;
//         console.log(chunkIndex)
//     })

//     req.on('end', () => {
//         // console.log(data);
//         res.end('Responseeeee');
//     });
// })