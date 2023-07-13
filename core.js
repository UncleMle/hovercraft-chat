const express = require('express');
const router = express.Router();
const api = require('./api/api');
const app = express();
const runPort = 8081;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.listen(runPort);

api.log(`Server now running on port ${runPort}`);


