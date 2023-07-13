const express = require('express');
const router = express.Router();
const api = require('./api/api');
const app = express();
const runPort = 8081;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const db = require('./models');
const discordBot = require('./discord/bot');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.listen(runPort);

api.log(`Server now running on port ${runPort} with a total of ${routes.routes.length} endpoints.`);

db.sequelize.sync().then(() => {
    logging: false
    api.log(`Sequelize is now running.`);

});

routes.routes.forEach(route => {
    app.use(route.path, require(route.location)[route.func]);
})
