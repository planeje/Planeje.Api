const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(routes);

module.exports = app;
