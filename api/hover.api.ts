import express, { Express, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import consoleLog from '../discord/hover.discord';
import { color, log, red, green, cyan, cyanBright, gray } from 'console-log-colors';
import { AppDataSource } from '../db/data-source';

class apiMethods {

    async Log(text : any) {
        console.log(gray(`${this.srvTime()}`), green(`| ${text}`));
    }

    srvTime(): string {
        var date = new Date();
        return `[${date.getFullYear()}/${date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()}/${date.getDay() < 10 ? "0"+date.getDay() : date.getDay()}] [${date.getHours() < 10 ? "0"+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()}]`;
    }

    getUnix(): number {
        return Math.round(Date.now() / 1000);
    }

    async checkAccProps(header: IncomingHttpHeaders, exceptPropsItems: string[]): Promise<Boolean> {
        let exceptProps: string[] = exceptPropsItems;
        let head: [string, string | string[]][] = Object.entries(header);

        let foundItems: number[] = [];
        for(const [key, val] of head) {
            if(exceptProps.indexOf(key) != -1) { foundItems.push(1) };
        }

        return foundItems.length > 2 ? true : false;
    }

    async getHeaderItem(header: IncomingHttpHeaders, item: string): Promise<string | false | string[]> {
        let headerObj: [string, string | string[]][] = Object.entries(header);

        let tok: string | string[];

        headerObj.find((obj, idx) => obj[idx] === item ? tok=obj[1] : "");

        return tok? tok : false;
    }

    formatUnixTimestamp (unixTimestamp) {
        const date = new Date(unixTimestamp * 1000)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
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