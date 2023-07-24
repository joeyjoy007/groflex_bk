import cors from 'cors'
import Logging from './helpers/Logging'
import { allRoutes } from './routes'
const express = require('express')
const app = express()
const port = 4000 || process.env.PORT

require('./config/database')


app.use((req:any, res:any, next:any) => {
    Logging.info(
        `Incoming => Method :[${req.method}] - Url :[${req.url}] = IP [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
        Logging.info(
            `Incoming => Method :[${req.method}] - Url :[${req.url}] = IP [${req.socket.remoteAddress}] -Status :[${req.statusCode}]`
        );
    });
    next();
});

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

allRoutes.map((e)=>{
    return app.use(e.path,e.route)
})


const server = app.listen(port,()=>{
    Logging.info(`server is running on port ${port}`)
})

