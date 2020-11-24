const User = require("../models/User");
const Log = require("../models/Log");
const BankAccount = require("../models/BankAccount");
const Category = require("../models/Category");
const SpendingGoal = require("../models/SpendingGoal");
const Transaction = require("../models/Transaction");
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {
      const { userId } = req.params;
      let user = await User.findByPk(userId, {
        include: { association: 'logs' }
      });

      let bankAccounts = await BankAccount.findAll({where: {userId}, paranoid: false})
      let categories = await Category.findAll({where: {userId}, paranoid: false})
      let spendingGoals = await SpendingGoal.findAll({where: {userId}, paranoid:false})
      let transactions = await Transaction.findAll({where: {userId}, paranoid:false})
      let users = await User.findAll({where: {id:userId}})

      for(item of user.logs){
        const{ registerId, table } = item
        item = item.dataValues
        if(table == 'BankAccounts'){
          item.bankAccount = bankAccounts.find(e=> e.id == registerId)
        }
        else if(table == 'Categories'){
          item.category = categories.find(e=> e.id == registerId)
        }
        else if(table == 'SpendingGoals'){
          item.spendingGoal = spendingGoals.find(e=> e.id == registerId)
        }
        else if(table == 'Transactions'){
          item.transaction = transactions.find(e=> e.id == registerId)
        }
        else if(table == 'Users'){
          item.user = users.find(e=> e.id == registerId)
        }
      }
      return res.status(200).send(user.logs);
    },

    async store(data) {
      console.log('criar log', data);
        Log.create({
            userId:data.userId,
            table: data.table,
            action: data.action,
            registerId: data.registerId
          });
    },
}
