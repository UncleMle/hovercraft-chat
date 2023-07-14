const express = require('express');
const router = express.Router();
const db = require('../models');
const api = require('../api/api');

module.exports.sessionGen = router.get('/', async(req, res) => {
    const token = req.header('x-auth-token');
    if(token) {
        const auth = await api.auth(token);
        if(auth) {
            var sessionId = api.charGen(5);

            db.chat_sessions.create({
                ownerToken: token,
                sessionId: sessionId,
                currentClients: "[]",
                lastUpdated: api.getUnix(),
                startedAt: api.getUnix()
            });

            res.send({
                status: true,
                sessionId: sessionId
            });

        } else return api.errHandle('auth', res);

    } else {
        api.errHandle('param', res);
    }
})