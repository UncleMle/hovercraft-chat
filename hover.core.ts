import express, { Express } from 'express';
import apiMethods from './api/hover.api';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';

const api = new apiMethods();

const app : Express = express();
const port : number = 8081;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.listen(port, () => {
    api.Log(`App is now listening on port ${port}`);
});

/*
routes.forEach((route : any) => {
    app.use(route.path, require(route.location));
});
*/