const jwt = require('jsonwebtoken');

exports.log = function cLog(text) {
    console.log(`${this.srvTime()} | ${text}`);
}

exports.srvTime = function srvTime() {
    var date = new Date();
    return `${date.getHours() < 10 ? "0"+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()}`;
}

exports.getUnix = function getUnix() {
    return Math.round(Date.now() / 1000);
}

exports.errHandle = function errHandle(handle, res) {
    switch(handle) {
        case 'auth':
        {
            res.status(401).send({
                status: false,
                error: 'You do not have authorization to access this resource'
            });
            break;
        }
        case 'badreq':
        {
            res.status(400).send({
                status: false,
                error: 'Bad request.'
            });
            break;
        }
        case 'param':
        {

            res.status(400).send({
                status: false,
                error: 'Parameter mismatch.'
            });
            break;
        }
        default: break;
    }
}

exports.auth = async function authToken(token) {
    if(!token) return;
    try {
        const decoded = jwt.verify(token, "jwtPrivateKey");
        return decoded ? true : false;
    } catch(e) {
        return false;
    }
}

exports.charGen = function charGen(len) {
    const tokenChars = "1234567890QWERTYUIOPLKJHGFDDSAQWEZXCVBNM";
    var res = '';
    for(var i = 0; i < len; i++) {
        res += tokenChars.charAt(Math.floor(Math.random() * tokenChars.length));
    }
    return res;
}