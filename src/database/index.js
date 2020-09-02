const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const BankAccount = require('../models/BankAccount');
const Category = require('../models/Category')
const Trasaction = require('../models/Transaction')
const SpendingGoal = require('../models/SpendingGoal')
const Log = require('../models/log')

const connection = new Sequelize(dbConfig);

User.init(connection);
BankAccount.init(connection);
Category.init(connection);
Trasaction.init(connection);
SpendingGoal.init(connection)
Log.init(connection)

module.exports = connection;