"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
routes_1.default.forEach((route) => {
    console.log(route);
});
const app = (0, express_1.default)();
const port = 8081;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(body_parser_1.default.json());
app.listen(port, () => {
    console.log('App is now listening on port ' + port);
});
app.get("/", (req, res) => {
    res.send({
        status: true,
        info: 'Sent'
    });
});
app.get("/hi", (req, res) => {
    res.send({
        status: true,
        info: 'Hell so'
    });
});
