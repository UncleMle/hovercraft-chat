import express, { Express } from 'express';
import apiMethods from './api/hover.api';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const api = new apiMethods();

const app : Express = express();
const port : number = 8081;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.listen(port, () => {
    api.Log(`App is now listening on port ${port}`);
});

import hoverAuth from './endpoints/hover.auth';

let routes: object[] = [
    { path: '/auth', location: hoverAuth }
]

routes.forEach((route : any) => {
    app.use(route.path, route.location)
})

api.Log(`All ${routes.length} routes were loaded.`);