import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';

const api = new apiMethods();
const router = express.Router();

export default router.get('/', async(req: Request, res: Response) => {
    const headers = req.headers;
    console.log(headers);
})