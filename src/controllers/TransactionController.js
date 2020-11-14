const Transaction = require("../models/Transaction");
const User = require("../models/User");
const BankAccount = require("../models/BankAccount");
const SpendingGoal = require("../models/SpendingGoal");
const { Op } = require('sequelize');
const Logger = require("./LogController")

module.exports = {
  async index(req, res) {
    const { userId } = req.params;

    let query = {
      include: {
          association: 'transactions',
        include: [
          {
            association: 'category',
            paranoid: false
          },
          {
            association: 'bankAccount',
            paranoid: false
          }
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
      return res.status(400).json({ error: 'User not found' });

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
      where: {
        categoryId: categoryId,
        [Op.and]: {
          categoryId: categoryId,
          goalDueDate: { [Op.gte]: transactionDueDate }
        }
      },
    });
    if(transactionType === 0) {
      await BankAccount.update(
        { balance: bankAccount.balance - transactionValue },
        { where: { id: accountId }}
      );
      if(!!spendingGoal) {
        await SpendingGoal.update(
          { valueAvaible: spendingGoal.valueAvaible - transactionValue },
          {
            where: {
              id: spendingGoal.id
            }
          }
        );
      }
    } else {
      await BankAccount.update(
        { balance: bankAccount.balance + transactionValue },
        { where: { id: accountId } }
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

    Logger.store({
      userId: transaction.userId,
      table: 'Transactions',
      action: 'I',
      registerId: transaction.id
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
      });
      Logger.store({
        userId: transaction.userId,
        table: 'Transactions',
        action: 'U',
        registerId: transaction.id
      });
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
      }
      return res.status(200).send();

    } else {
      return res.status(401).send({ error: 'Transaction not found'});
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
      const transactionEdited = await Transaction.update({
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
      const newTransaction = await Transaction.findByPk(id)

      //mudar valor sem mudar conta atualiza o valor da conta 
      if(transaction.transactionValue != transactionValue && transaction.accountId == newTransaction.accountId){
        const bankAccount = await BankAccount.findByPk(transaction.accountId)
        await BankAccount.update({
          balance: bankAccount.balance + (transaction.transactionValue - transactionValue)
        },{
          where: {id: transaction.accountId}
        });
      }

       //Se mudar conta atualiza saldo das contas
       if(transaction.accountId != newTransaction.accountId){
        const oldBankAccount = await BankAccount.findByPk(transaction.accountId);
        const newBankAccount = await BankAccount.findByPk(newTransaction.accountId);

        if(transaction.transactionType == 0){
          await BankAccount.update({
            balance: oldBankAccount.balance + transaction.transactionValue
          },{ where: {id: oldBankAccount.id}});
          await BankAccount.update({
            balance: newBankAccount.balance - newTransaction.transactionValue
          },{ where: {id: newBankAccount.id}});
        }
        else{
          await BankAccount.update({
            balance: oldBankAccount.balance - transaction.transactionValue
          },{ where: {id: oldBankAccount.id}});
          await BankAccount.update({
            balance: newBankAccount.balance + newTransaction.transactionValue
          },{ where: {id: newBankAccount.id}});
        }
      }

      //Se mudar valor e nao mudar categoria atualiza meta
      if(transaction.transactionValue != transactionValue && transaction.categoryId == newTransaction.categoryId){
        const spendingGoal = await SpendingGoal.findOne({
          where: {categoryId: transaction.categoryId},
          goalDueDate: {[Op.lte] : transaction.transactionDueDate}
        });

        await SpendingGoal.update({
          valueAvaible: spendingGoal.valueAvaible + (transaction.transactionValue - transactionValue)
          }, {where: { id: spendingGoal.id }}
        );
      }

      //Se mudar meta atualiza valores das metas
      if(transaction.categoryId !== newTransaction.categoryId){
        const oldSpendingGoal = await SpendingGoal.findOne({
          where: {categoryId: transaction.categoryId},
          goalDueDate: {[Op.lte] : transaction.transactionDueDate}
        });
        const newSpendingGoal = await SpendingGoal.findOne({
          where: {categoryId: newTransaction.categoryId},
          goalDueDate: {[Op.lte] : newTransaction.transactionDueDate}
        });
        await SpendingGoal.update({
          valueAvaible: oldSpendingGoal.valueAvaible + transaction.transactionValue
          }, { where : {id: oldSpendingGoal}}
        );
        await SpendingGoal.update({
          valueAvaible: newSpendingGoal.valueAvaible + newTransaction.transactionValue
          }, { where : {id: newSpendingGoal}}
        );
      }

      return res.status(200).send(transactionEdited);
    } else{
      return res.status(401).send({ error: 'Transaction not found' });
    }
  }
}
