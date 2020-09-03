const express = require('express');
const BankAccountController = require('./controllers/BankAccountController');
const UserController = require('./controllers/UserController');


const routes = express.Router();

routes.get('/users',UserController.index);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.destroy);
routes.put('/users/:id', UserController.update)

routes.get('/users/:userId/bankAccounts', BankAccountController.index)
routes.post('/users/:userId/bankAccounts', BankAccountController.store)
routes.delete('/bankAccounts/:id', BankAccountController.destroy)
routes.put('/bankAccounts/:id', BankAccountController.update)
module.exports = routes;