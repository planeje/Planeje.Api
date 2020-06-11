const express = require('express');
const cors = require('cors');

const app = express();
const index = require('./src/routes/index');
const transactionRoute = require('./src/routes/transaction.routes');
const categoryRoute = require('./src/routes/category.routes');
const bankAccount = require('./src/routes/bankAccount.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', transactionRoute);
app.use('/api/', categoryRoute);
app.use('/api/', bankAccount);

module.exports = app;