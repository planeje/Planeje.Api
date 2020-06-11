const db = require('../config/database');

exports.createBankAccount = async (req, res) => {
    console.log(req.body);
    const { 
        accountName,
        balance
    } = req.body;
    const { rows } = await db.query(
        `INSERT INTO public.bank_account(
            account_name, balance) VALUES($1, $2)`, [accountName, balance]
    );

    res.status(201).send({
        message: "Bank account added successfully!",
        body: {
            BankAccount: {
                accountName,
                balance
            }
        }
    });
};

exports.listAllBankAccounts = async (req, res) => {
    const response = await db.query('SELECT * FROM public.bank_account');
    res.status(200).send(response.rows);
}

exports.findBankAccountById = async (req, res) => {
    const accountId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM public.bank_account WHERE account_id = $1', [accountId]);
    res.status(200).send(response.rows);
}

exports.updateBankAccountById = async (req, res) => {
    const accountId = parseInt(req.params.id);
    const { 
        account_name,
        balance,
    } = req.body;

    const response = await db.query(
        `UPDATE public.bank_account SET 
            account_name = $1,
            balance = $2
            WHERE account_id = $3
            `,
            [
                account_name,
                balance,
                accountId
            ]
    );

    res.status(200).send({ message: 'Bank account succesfully updated' });
}

exports.deleteBankAccountById = async (req, res) => {
    const accountId = parseInt(req.params.id);
    await db.query('DELETE FROM public.bank_account WHERE account_id = $1', [
        accountId
    ]);

    res.status(200).send({ message: 'Bank account successfully deleted!', accountId });
}
