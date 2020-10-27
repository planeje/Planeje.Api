const Transaction = require("../models/Transaction");
const User = require("../models/User");

module.exports = {
    async index( req, res){
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: { 
                association: 'transactions', 
                include: [
                    { association: 'category'},
                    {association: 'bankAccount'}
                ]  
            } 
        })

        return res.json(user.transactions)
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