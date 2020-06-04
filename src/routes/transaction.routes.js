const router = require('express-promise-router')();
const transactionController = require('../controllers/transaction.controller');

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions', transactionController.listAllTransactions);
router.get('/transactions/:id', transactionController.findTransactionById);
router.put('/transactions/:id', transactionController.updateTransactionById);
router.delete('/transactions/:id', transactionController.deleteTransactionById);

module.exports = router;