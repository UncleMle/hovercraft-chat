exports.log = function cLog(text) {
    console.log(`${this.srvTime()} | ${text}`);
}

exports.srvTime = function srvTime() {
    var date = new Date();
    return `${date.getHours() < 10 ? "0"+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()}`;
}