const router = require('express-promise-router')();
const bankAccountController = require('../controllers/bankAccount.controller');

router.post('/bankAccounts', bankAccountController.createBankAccount);
router.get('/bankAccounts', bankAccountController.listAllBankAccounts);
router.get('/bankAccounts/:id', bankAccountController.findBankAccountById);
router.put('/bankAccounts/:id', bankAccountController.updateBankAccountById);
router.delete('/bankAccounts/:id', bankAccountController.deleteBankAccountById);

module.exports = router;