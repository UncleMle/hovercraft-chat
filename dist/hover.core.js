"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hover_api_1 = __importDefault(require("./api/hover.api"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const api = new hover_api_1.default();
const app = (0, express_1.default)();
const port = 8081;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(body_parser_1.default.json());
app.listen(port, () => {
    api.Log(`App is now listening on port ${port}`);
});
const hover_auth_1 = __importDefault(require("./endpoints/hover.auth"));
let routes = [
    { path: '/auth', location: hover_auth_1.default }
];
routes.forEach((route) => {
    app.use(route.path, route.location);
});
api.Log(`All ${routes.length} routes were loaded.`);
