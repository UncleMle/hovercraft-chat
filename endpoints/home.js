const router = require('express').Router();
const db = require('../models');
const api = require('../api/api');

module.exports = router.get('/', async(req, res) => {
    db.chat_session_ids.findAll({}).then(result => {
        result.length > 0 ? res.send({ status: true, info: 'Chat has messages' }) : res.send({ status: false, info: 'Chat doesnt messages' })
    })
})