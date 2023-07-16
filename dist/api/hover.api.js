"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class apiMethods {
    Log(text) {
        console.log(`${this.srvTime()} | ${text}`);
    }
    srvTime() {
        var date = new Date();
        return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;
    }
    getUnix() {
        return Math.round(Date.now() / 1000);
    }
    errHandle(handle, res) {
        switch (handle) {
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
    authToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token)
                return;
            try {
                const decoded = jsonwebtoken_1.default.verify(token, "jwtPrivateKey");
                return decoded ? true : false;
            }
            catch (e) {
                return false;
            }
        });
    }
    charGen(len) {
        const tokenChars = "1234567890QWERTYUIOPLKJHGFDDSAQWEZXCVBNM";
        var res = '';
        for (var i = 0; i < len; i++) {
            res += tokenChars.charAt(Math.floor(Math.random() * tokenChars.length));
        }
        return res;
    }
}
exports.default = apiMethods;
