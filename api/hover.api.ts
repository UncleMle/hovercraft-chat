import express, { Express, Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import { color, log, red, green, cyan, cyanBright, gray } from 'console-log-colors';
import { AppDataSource } from '../db/data-source';
import { Repository } from 'typeorm';
import { webTokens } from '../db/entities/hover.webTokens';

class api {

    public static Log(text : any): void {
        console.log(gray(`${this.srvTime()}`), green(`| ${text}`));
    }

    public static srvTime(): string {
        var date = new Date();
        return `[${date.getFullYear()}/${date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()}/${date.getDay() < 10 ? "0"+date.getDay() : date.getDay()}] [${date.getHours() < 10 ? "0"+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds()}]`;
    }

    public static getUnix(): number {
        return Math.round(Date.now() / 1000);
    }

    public static async checkHeaderProps(header: IncomingHttpHeaders, exceptPropsItems: string[]): Promise<Boolean> {
        let exceptProps: string[] = exceptPropsItems;
        let head: [string, string | string[]][] = Object.entries(header);

        let foundItems: number[] = [];
        for(const [key, val] of head) {
            if(exceptProps.indexOf(key) != -1) { foundItems.push(1) };
        }

        return foundItems.length >= exceptProps.length? true: false;
    }

    public static async getHeaderItem(header: IncomingHttpHeaders, item: string): Promise<string | false | string[]> {
        let headerObj: [string, string | string[]][] = Object.entries(header);

        let headerItem: string | string[];

        headerObj.find((obj, idx) => obj[idx] === item? headerItem=obj[1]: (null));

        return headerItem? headerItem: false;
    }

    public static async valEmail(emailAddress: string): Promise<boolean> {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(emailAddress).toLowerCase());
    }

    public static async retrieveTokenData(token: string): Promise<webTokens | boolean> {
        const tokenRepo: Repository<webTokens> = AppDataSource.getRepository(webTokens);

        const findToken: webTokens = await tokenRepo.findOne({ where: { token: token } });

        return findToken? findToken: false;
    }

    public static async formatUnixTimestamp (unixTimestamp: number): Promise<string> {
        const date: Date | number = new Date(unixTimestamp * 1000)
        const hours: number = date.getHours()
        const minutes: number = date.getMinutes()
        const seconds: number = date.getSeconds()
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    public static errHandle(handle : string, res : Response): void {
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

    public static async containsNumbers(str: string): Promise<boolean | string> {
        return /\d/.test(str);
    }

    public static async containsUppercase(str: string): Promise<boolean | string> {
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(str);
    }

    public static async authToken(token : string): Promise<boolean> {
        if(!token) return;
        try {
            const decoded = jwt.verify(token, "jwtPrivateKey");
            return decoded ? true : false;
        } catch(e) {
            return false;
        }
    }

    public static charGen(len : number): string {
        const tokenChars = "1234567890QWERTYUIOPLKJHGFDDSAQWEZXCVBNM";
        var res = '';
        for(var i = 0; i < len; i++) {
            res += tokenChars.charAt(Math.floor(Math.random() * tokenChars.length));
        }
        return res;
    }
}

export default api;