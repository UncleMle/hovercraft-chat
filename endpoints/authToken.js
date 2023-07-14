const express = require('express');
const router = express.Router();
const db = require('../models');
const api = require('../api/api');

module.exports.checkToken = router.get('/', async(req, res) => {
    const token = req.header('x-auth-token');
    var auth = await api.auth(token);
    res.send({
        status: auth ? true : false,
    })
})