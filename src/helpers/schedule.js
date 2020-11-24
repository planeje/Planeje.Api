const Transaction = require("../models/Transaction");
const BankAccount = require("../models/BankAccount");
const SpendingGoal = require("../models/SpendingGoal");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

module.exports = {
    async schedule(){
        let transactions = await Transaction.findAll({
            where: sequelize.where(sequelize.fn('date', sequelize.col('transactionDueDate')), '=', new Date())
        })
        
        for(item of transactions){
            let bankAccount = await BankAccount.findByPk(item.accountId)
            if (item.transactionType == 0){
                await BankAccount.update({
                    balance: bankAccount.balance - item.transactionValue
                },{
                    where:{id: item.accountId}
                })
            
                const spendingGoal = await SpendingGoal.findOne({
                    where: {categoryId: item.categoryId},
                    goalDueDate: {[Op.lte] : item.transactionDueDate}
                });
                
                if(spendingGoal){
                    await SpendingGoal.update(
                        {valueAvaible: spendingGoal.valueAvaible + item.transactionValue },
                        {where: { id: spendingGoal.id }}
                    );
                }
            }
            else{
                await BankAccount.update({
                    balance: bankAccount.balance + item.transactionValue
                },{
                    where:{id: item.accountId}
                })
            }
        }
    }
}