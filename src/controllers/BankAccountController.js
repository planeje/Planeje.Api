const BankAccount = require("../models/BankAccount");
const User = require("../models/User");
const Logger = require("./LogController")

module.exports = {
  async index(req, res) {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      include: { association: 'bankAccounts' }
    });
    return res.status(200).send(user.bankAccounts);
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
    Logger.store({
      userId: userId,
      table: 'BankAccounts',
      action: 'I',
      registerId: bankAccount.id
    });
    return res.status(200).send(bankAccount);
  },

  async destroy(req, res) {
    const { id } = req.params;
    const bankAccount = await BankAccount.findByPk(id);

    if (!bankAccount)
      return res.status(401).send({ error: 'Bank account not found' });

    BankAccount.destroy({
      where: {
        id: id
      }
    });
    Logger.store({
      userId: bankAccount.userId,
      table: 'BankAccounts',
      action: 'D',
      registerId: bankAccount.id
    });
    return res.status(200).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { accountName, balance } = req.body;
    const bankAccount = await BankAccount.findByPk(id);

    if (!bankAccount)
      return res.status(401).send({ error: 'Bank account not found' });

    const bankAccountEdited = await BankAccount.update({
      accountName: accountName,
      balance: balance
    }, {
      where: {
        id: id
      }
    });

    Logger.store({
      userId: bankAccount.userId,
      table: 'BankAccounts',
      action: 'U',
      registerId: bankAccount.id
    });

    return res.status(200).send(bankAccountEdited);
  }
}
