import express, { Request, Response } from 'express';
import apiMethods from '../api/hover.api';
import jwt from 'jsonwebtoken';
import { webTokens } from '../db/entities/hover.webTokens';
import { AppDataSource } from '../db/data-source';
import { Repository } from 'typeorm';
import { IncomingHttpHeaders } from 'http';

const router = express.Router();

export default router.get('/', async(req : Request, res: Response) => {
    const headers: IncomingHttpHeaders = req.headers;
    const headerCheck: Boolean = await apiMethods.checkHeaderProps(headers, ['x-auth-token']);
    const tokenAuth = headerCheck? await apiMethods.authToken(req.header('x-auth-token')):(null);

    const tokenRepo: Repository<webTokens> = AppDataSource.getRepository(webTokens);

    let _foundToken: webTokens;

    tokenAuth && headerCheck? (
        _foundToken = await tokenRepo.findOne({ where: { token: req.header('x-auth-token') } }),
        _foundToken? res.status(200).send({ status: true, data: _foundToken }): (null)
    ): (null);

    if(_foundToken) return res.status(401).send({
        status: false,
        error: 'Invalid or expired token'
    });

    const token: string = jwt.sign({}, "jwtPrivateKey", { expiresIn: "70m" });

    const newToken: webTokens = new webTokens();
    newToken.token = token;
    newToken.sessionId = "None";
    newToken.adminLevel = 0;
    newToken.accountId = -1;
    newToken.accountUUID = "None";
    newToken.timeCreated = apiMethods.getUnix();
    newToken.createdAt = apiMethods.getUnix();

    tokenRepo.save(newToken).catch(err => apiMethods.Log(err));

    res.status(200).send({
        status: true,
        adminLevel: 0,
        token: token,
        info: 'Token recieved'
    });

})
