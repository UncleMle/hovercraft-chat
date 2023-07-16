import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

routes.forEach((route : any) => {
    console.log(route);
})

const app : Express = express();
const port : number = 8081;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log('App is now listening on port '+ port);
})

app.get("/", (req : Request, res : Response) => {
    res.send({
        status: true,
        info: 'Sent'
    })
})

app.get("/hi", (req : Request, res : Response) => {
    res.send({
        status: true,
        info: 'Hell so'
    })
})



