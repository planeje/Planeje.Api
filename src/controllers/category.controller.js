const db = require('../config/database');

exports.createCategory = async (req, res) => {
    console.log(req.body);
    const { 
        categoryName
    } = req.body;
    const { rows } = await db.query(
        `INSERT INTO public.categories(
            category_name) VALUES($1)`, [categoryName]
    );

    res.status(201).send({
        message: "Category added successfully!",
        body: {
            category: {
                categoryName
            }
        }
    });
};

exports.listAllCategories = async (req, res) => {
    const response = await db.query('SELECT * FROM public.categories');
    res.status(200).send(response.rows);
}

exports.findCategoryById = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const response = await db.query('SELECT * FROM public.categories WHERE category_id = $1', [categoryId]);
    res.status(200).send(response.rows);
}

exports.updateCategoryById = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const { 
        categoryName,
    } = req.body;

    const response = await db.query(
        `UPDATE public.categories SET 
            category_name = $1
            WHERE category_id = $2
            `,
            [
                categoryName,
                categoryId
            ]
    );

    res.status(200).send({ message: 'Category succesfully updated' });
}

exports.deleteCategoryById = async (req, res) => {
    const categoryId = parseInt(req.params.id);
    await db.query('DELETE FROM public.categories WHERE category_id = $1', [
        categoryId
    ]);

    res.status(200).send({ message: 'Category successfully deleted!', categoryId });
}
