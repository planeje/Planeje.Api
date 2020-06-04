const db = require('../config/database');

exports.createTransaction = async (req, res) => {
    console.log(req.body);
    const { 
        description,
        recurrent,
        transactionValue,
        categoryId,
        bankId,
        transactionDate,
        transactionDueDate,
        transactionType
    } = req.body;
    const { rows } = await db.query(
        `INSERT INTO public.transactions(
            description, recurrent, transaction_value, category_id, bank_id, transaction_date, transaction_due_date, transaction_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
            description,
            recurrent,
            transactionValue,
            categoryId,
            bankId,
            transactionDate,
            transactionDueDate,
            transactionType
        ]
    );

    res.status(201).send({
        message: "Product added successfully!",
        body: {
            transaction: {
                description,
                recurrent,
                transactionValue,
                categoryId,
                bankId,
                transactionDate,
                transactionDueDate,
                transactionType
            }
        }
    });
};

exports.listAllTransactions = async (req, res) => {
    const response = await db.query('SELECT * FROM public.transactions ORDER BY transaction_date DESC');
    res.status(200).send(response.rows);
}

exports.findTransactionById = async (req, res) => {
    const transactionId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM public.transactions WHERE transaction_id = $1', [transactionId]);
    res.status(200).send(response.rows);
}

exports.updateTransactionById = async (req, res) => {
    const transactionId = parseInt(req.params.id);
    const { 
        description,
        recurrent,
        transactionValue,
        categoryId,
        bankId,
        transactionDueDate,
    } = req.body;

    const response = await db.query(
        `UPDATE public.transactions SET 
            description = $1,
            recurrent = $2,
            transaction_value = $3,
            category_id = $4,
            bank_id = $5,
            transaction_due_date = $6
            WHERE transaction_id = $7
            `,
            [
                description,
                recurrent,
                transactionValue,
                categoryId,
                bankId,
                transactionDueDate,
                transactionId
            ]
    );

    res.status(200).send({ message: 'Transaction succesfully updated' });
}

exports.deleteTransactionById = async (req, res) => {
    const transactionId = parseInt(req.params.id);
    await db.query('DELETE FROM public.transactions WHERE transaction_id = $1', [
        transactionId
    ]);

    res.status(200).send({ message: 'Transaction successfully deleted!', transactionId });
}
