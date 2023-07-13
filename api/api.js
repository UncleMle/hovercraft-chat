exports.log = function cLog(text) {
    console.log(`${this.srvTime()} | ${text}`);
}

exports.srvTime = function srvTime() {
    var date = new Date();
    return `${date.getHours() < 10 ? "0"+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()}`;
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
        default: break;
    }
}