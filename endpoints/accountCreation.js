const router = require('express').Router();
const db = require('../models');
const api = require('../api/api');
const rateLimit = require('express-rate-limit');

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 1,
	message: 'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true,
	legacyHeaders: false,
})

module.exports.accountCreate = router.get('/', createAccountLimiter, async(req, res) => {
    res.send({
        status: true,
        info: 'Request Recieved'
    });
});
