import express, { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

class apiMethods {

    Log(text : any): void {
        console.log(`${this.srvTime()} | ${text}`);
    }

    srvTime(): string {
        var date = new Date();
        return `${date.getHours() < 10 ? "0"+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()}`;
    }

    getUnix(): number {
        return Math.round(Date.now() / 1000);
    }

    errHandle(handle : string, res : Response) {
        switch(handle) {
            case 'auth':
            {
                res.status(401).send({
                    status: false,
                    error: 'You do not have authorization to access this resource or the token entered was invalid or not specified.'
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

    async authToken(token : string): Promise<boolean> {
        if(!token) return;
        try {
            const decoded = jwt.verify(token, "jwtPrivateKey");
            return decoded ? true : false;
        } catch(e) {
            return false;
        }
    }

    charGen(len : number): string {
        const tokenChars = "1234567890QWERTYUIOPLKJHGFDDSAQWEZXCVBNM";
        var res = '';
        for(var i = 0; i < len; i++) {
            res += tokenChars.charAt(Math.floor(Math.random() * tokenChars.length));
        }
        return res;
    }
}

export default apiMethods;