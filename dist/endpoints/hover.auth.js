"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hover_api_1 = __importDefault(require("../api/hover.api"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api = new hover_api_1.default();
const router = express_1.default.Router();
exports.default = router.get('/', (req, res) => {
    const token = jsonwebtoken_1.default.sign({}, "jwtPrivateKey", { expiresIn: "60m" });
    res.status(200).send({
        status: true,
        token: token,
        info: 'Token recieved'
    });
});
