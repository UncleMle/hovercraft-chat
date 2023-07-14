const router = require('express').Router();
const db = require('../models');
const api = require('../api/api');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');

/* Rate limit for account creation
const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 1,
	message: 'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true,
	legacyHeaders: false,
})
*/

module.exports.init = router.get('/', async(req, res) => {
	const token = jwt.sign({}, "jwtPrivateKey", { expiresIn: "60m" });
	db.web_tokens.create({
		token: token,
		activated: api.getUnix()
	}).then(() => {
		res.send({
			status: true,
			token: token,
			info: "Request Recieved"
		})
	}).catch(err => {api.log(err)})
});

