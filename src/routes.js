const express = require('express');
const BankAccountController = require('./controllers/BankAccountController');
const CategoryController = require('./controllers/CategoryController');
const SpendingGoalController = require('./controllers/SpendingGoalController');
const UserController = require('./controllers/UserController');
const authMiddleware = require('./middlewares/auth');
const TransactionController = require('./controllers/TransactionController');


const routes = express.Router();
// users
routes.post('/users/authenticate', UserController.authenticate);
routes.post('/users', UserController.store);
routes.post('/users/forgotPassword', UserController.forgotPassword);
routes.post('/users/resetPassword', UserController.resetPassword);
routes.use(authMiddleware).get('/users', UserController.index);
routes.use(authMiddleware).get('/users/:id', UserController.one);
routes.use(authMiddleware).delete('/users/:id', UserController.destroy);
routes.use(authMiddleware).put('/users/:id', UserController.update);
routes.use(authMiddleware).put('/users/:id/changePassword', UserController.updatePassword);
// bank accounts
routes.use(authMiddleware).get('/user/:userId/bankAccounts', BankAccountController.index);
routes.use(authMiddleware).post('/user/:userId/bankAccounts', BankAccountController.store);
routes.use(authMiddleware).delete('/bankAccounts/:id', BankAccountController.destroy);
routes.use(authMiddleware).put('/bankAccounts/:id', BankAccountController.update);
// categories
routes.use(authMiddleware).get('/user/:userId/categories', CategoryController.index);
routes.use(authMiddleware).post('/user/:userId/categories', CategoryController.store);
routes.use(authMiddleware).delete('/categories/:id', CategoryController.destroy);
routes.use(authMiddleware).put('/categories/:id', CategoryController.update);
// spending goals
routes.use(authMiddleware).get('/user/:userId/category/:categoryId/goals', SpendingGoalController.index);
routes.use(authMiddleware).post('/user/:userId/category/:categoryId/goals', SpendingGoalController.store);
routes.use(authMiddleware).put('/category/:categoryId/goals/:id', SpendingGoalController.update);
routes.use(authMiddleware).delete('/category/:categoryId/goals/:id', SpendingGoalController.destroy);
// Transactions
routes.use(authMiddleware).get('/user/:userId/transactions', TransactionController.index);
routes.use(authMiddleware).post('/user/:userId/transactions', TransactionController.store);
routes.use(authMiddleware).delete('/transactions/:id', TransactionController.destroy);
routes.use(authMiddleware).put('/transactions/:id', TransactionController.update);
module.exports = routes;
