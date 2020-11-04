const Transaction = require("../models/Transaction");
const User = require("../models/User");
const BankAccount = require("../models/BankAccount");
const SpendingGoal = require("../models/SpendingGoal");
const { Op } = require('sequelize');

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
    const spendingGoal = await SpendingGoal.findOne({
      where: {categoryId: categoryId},
    });
    if(transactionType == 0) {
      await BankAccount.update(
        { balance: bankAccount.balance - transactionValue },
        { where: { id: accountId }}
      );
      await SpendingGoal.update(
        { valueAvaible: spendingGoal.valueAvaible - transactionValue },
        {
          where: {
            [Op.and]: {
              categoryId: categoryId,
              goalDueDate: { [Op.gte]: transactionDueDate }
            }
          }
        }
      );
    } else {
        await BankAccount.update(
          { balance: bankAccount.balance + transactionValue },
          { where: { id: accountId } }
        );
        await SpendingGoal.update(
          { valueAvaible: spendingGoal.valueAvaible - transactionValue },
          {where: {
              categoryId: categoryId,
              goalDueDate: {[Op.gte] : new Date()}
            }
          }
        );
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

      return res.status(200).send(transaction);
  },

  async destroy(req, res) {
    const {id} = req.params;
    const transaction = await Transaction.findByPk(id);
    if(transaction) {
      Transaction.destroy({
        where: {
          id: id
        }
      })
      //Tira ou coloca saldo da conta
      const bankAccount = await BankAccount.findByPk(transaction.accountId);
      const spendingGoal = await SpendingGoal.findOne({
        where: {categoryId: transaction.categoryId},
        goalDueDate: {[Op.lte] : transaction.transactionDueDate}
      });
      if(transaction.transactionType == 0) {
        await BankAccount.update(
          { balance: bankAccount.balance + transaction.transactionValue },
          { where: { id: transaction.accountId } },
        );
        await SpendingGoal.update(
          { valueAvaible: spendingGoal.valueAvaible - transaction.transactionValue },
          { where: {
              categoryId: transaction.categoryId,
              goalDueDate: {[Op.lte] : transaction.transactionDueDate}
          } },
          { limit: 1 }
        );
      } else {
        await BankAccount.update(
          { balance: bankAccount.balance - transaction.transactionValue },
          { where: { id: transaction.accountId } },
        );
        await SpendingGoal.update(
          { valueAvaible: spendingGoal.valueAvaible + transaction.transactionValue },
          { where: {
            categoryId: transaction.categoryId,
            goalDueDate: { [Op.lte] : transaction.transactionDueDate }
          }},
          {limit: 1 }
        );
      }
      return res.json('Transaction '+ id + ' deleted');

    } else {
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
      accountId
    } = req.body;
    const transaction = await Transaction.findByPk(id)
    if(transaction) {
      const transactionEdited = Transaction.update({
        description,
        recurrent,
        transactionValue,
        transactionDate,
        transactionDueDate,
        transactionType,
        categoryId,
        accountId,
      }, {
        where: {
            id: id
        }
      });

      if(transaction.transactionValue != transactionValue){
        const bankAccount = await BankAccount.findByPk(transaction.accountId)
        await BankAccount.update({
          balance: bankAccount.balance + (transaction.transactionValue - transactionValue)
        },{
          where: {id: transaction.accountId}
        });

        const spendingGoal = await SpendingGoal.findOne({
          where: {categoryId: transaction.categoryId},
          goalDueDate: {[Op.lte] : transaction.transactionDueDate}
        });

        await SpendingGoal.update({
          valueAvaible: spendingGoal.valueAvaible + (transaction.transactionValue - transactionValue)
          }, {where: { id: spendingGoal.id }}
        );
      }

      return res.json('Transaction '+ id + ' updated')
    } else{
      return res.json('Transaction not found')
    }
  }
}
