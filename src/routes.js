const express = require('express');
const BankAccountController = require('./controllers/BankAccountController');
const CategoryController = require('./controllers/CategoryController');
const UserController = require('./controllers/UserController');
const authMiddleware = require('./middlewares/auth');


const routes = express.Router();
// users
routes.post('/users/authenticate', UserController.authenticate);
routes.post('/users', UserController.store);
routes.post('/users/forgotPassword', UserController.forgotPassword);
routes.post('/users/resetPassword', UserController.resetPassword);
routes.use(authMiddleware).get('/users', UserController.index);
routes.use(authMiddleware).delete('/users/:id', UserController.destroy);
routes.use(authMiddleware).put('/users/:id', UserController.update)
// bank accounts
routes.use(authMiddleware).get('/users/:userId/bankAccounts', BankAccountController.index)
routes.use(authMiddleware).post('/users/:userId/bankAccounts', BankAccountController.store)
routes.use(authMiddleware).delete('/bankAccounts/:id', BankAccountController.destroy)
routes.use(authMiddleware).put('/bankAccounts/:id', BankAccountController.update)
// categories
routes.use(authMiddleware).get('/users/:userId/categories', CategoryController.index)
routes.use(authMiddleware).post('/users/:userId/categories', CategoryController.store)
routes.use(authMiddleware).delete('/categories/:id', CategoryController.destroy)
routes.use(authMiddleware).put('/categories/:id', CategoryController.update)

module.exports = routes;
