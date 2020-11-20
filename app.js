const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
require('dotenv').config();
const cron = require("node-cron");
const {schedule} = require('./src/helpers/schedule');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(routes);

//cron.schedule("* * * * *", schedule); //executa a cada um minut
cron.schedule("0 0 0 * * *", schedule, {timezone: "America/Sao_Paulo"}) //executa todo dia as 0hrs

module.exports = app;
