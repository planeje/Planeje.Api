const BankAccount = require("../models/BankAccount");
const User = require("../models/User");


module.exports = {
    async index( req, res){
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: { association: 'bankAccounts' }
        })

        return res.json(user.bankAccounts)
    },

    async store(req, res) {
        const { userId } = req.params;
        const { accountName, balance } = req.body;

        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const bankAccount = await BankAccount.create({
            accountName,
            balance,
            userId
        });

        return res.json(bankAccount);
    },

    async destroy(req, res){
        const {id} = req.params;
        const bankAccount = await BankAccount.findByPk(id)
        if(bankAccount){
            BankAccount.destroy({
                where: {
                    id: id
                }
            })
            return res.json('Bank Account '+ id + ' deleted');
        }
        else{
            return res.json('Bank Account not found')
        }
    },

    async update(req, res){
        const {id} = req.params;
        const { accountName, balance } = req.body;
        const bankAccount = await BankAccount.findByPk(id)
        if(bankAccount){
            BankAccount.update({
                accountName: accountName,
                balance: balance
            },{
                where: {
                    id: id
                }
            })
            return res.json('Bank Account '+ id + ' updated')
        }
        else{
            return res.json('Bank Account not found')
        }
    }
    


}