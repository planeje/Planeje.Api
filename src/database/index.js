const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const BankAccount = require('../models/BankAccount');
const Category = require('../models/Category')
const Trasaction = require('../models/Transaction')
const SpendingGoal = require('../models/SpendingGoal')
const Log = require('../models/Log');
const Transaction = require('../models/Transaction');

const connection = new Sequelize(dbConfig);

User.init(connection);
BankAccount.init(connection);
Category.init(connection);
Trasaction.init(connection);
SpendingGoal.init(connection);
Log.init(connection);

User.associate(connection.models);
BankAccount.associate(connection.models);
Category.associate(connection.models);
Transaction.associate(connection.models);
Log.associate(connection.models);

module.exports = connection;
