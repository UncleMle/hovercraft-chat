import express, { Request, Response, Router } from 'express';
import apiMethods from '../api/hover.api';

const router: Router = express.Router();

export default router.get('/', async(req: Request, res: Response): Promise<void | boolean> => {
    const url = 'https://discord.com/api/oauth2/authorize?client_id=1128841767756759080&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fauth%2Fdiscord&response_type=code&scope=identify';

    res.redirect(url);
});

