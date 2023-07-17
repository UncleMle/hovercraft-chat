import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';
import jwt from 'jsonwebtoken';

const api = new apiMethods();
const router = express.Router();


export default router.get('/', (req : Request, res: Response) => {
    const token = jwt.sign({}, "jwtPrivateKey", { expiresIn: "60m" });

    res.status(200).send({
        status: true,
        token: token,
        info: 'Token recieved'
    })

})
