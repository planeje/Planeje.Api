const Transaction = require("../models/Transaction");
const User = require("../models/User");
const BankAccount = require("../models/BankAccount");
const { Op } = require('sequelize')

module.exports = {
  async index(req, res) {
    const { userId } = req.params;
    let query = {
      include: {
        association: 'transactions',
        include: [
          { association: 'category' },
          { association: 'bankAccount'}
        ]
      }
    }
    if (req.query.categoryId > 0) {
      query.include.include[0].where = {
        id: req.query.categoryId
      }
    }
    if (req.query.dataInicial && req.query.dataFinal) {
      query.include.where = {
        transactionDueDate: {
          [Op.between]: [req.query.dataInicial, req.query.dataFinal]
        }
      }
    }
    const user = await User.findByPk(userId, query);
    if(!user)
      return res.status(200).send([]);

    return res.status(200).send(user.transactions);
  },

    async store(req, res) {
        const { userId } = req.params;
        const {
            description,
            recurrent,
            transactionValue,
            transactionDate,
            transactionDueDate,
            transactionType,
            categoryId,
            accountId,
        } = req.body;

        const user = await User.findByPk(userId);
        //Movimenta valor na transação
        const bankAccount = await BankAccount.findByPk(accountId);
        //console.log(bankAccount)
        if(transactionType == 0){
            await BankAccount.update(
                {balance: bankAccount.balance - transactionValue},
                {where: { id: accountId }}
            )
        }
        else{
            await BankAccount.update(
                {balance: bankAccount.balance + transactionValue},
                {where: { id: accountId }}
            )
        }

        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const transaction  = await Transaction.create({
            description,
            recurrent,
            transactionValue,
            transactionDate,
            transactionDueDate,
            transactionType,
            userId,
            categoryId,
            accountId
        });

        return res.json(transaction);
    },

    async destroy(req, res){
        const {id} = req.params;
        const transaction = await Transaction.findByPk(id)
        if(transaction){
            Transaction.destroy({
                where: {
                    id: id
                }
            })
            return res.json('Transaction '+ id + ' deleted');
        }
        else{
            return res.json('Transaction not found')
        }
    },

    async update(req, res){
        const {id} = req.params;
        const {
            description,
            recurrent,
            transactionValue,
            transactionDate,
            transactionDueDate,
            transactionType,
            categoryId,
            accountId, } = req.body;
        const transaction = await Transaction.findByPk(id)
        if(transaction){
            Transaction.update({
                description,
                recurrent,
                transactionValue,
                transactionDate,
                transactionDueDate,
                transactionType,
                categoryId,
                accountId,
            },{
                where: {
                    id: id
                }
            })
            return res.json('Transaction '+ id + ' updated')
        }
        else{
            return res.json('Transaction not found')
        }
    }



}
