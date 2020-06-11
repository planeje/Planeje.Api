const router = require('express-promise-router')();
const categoryController = require('../controllers/category.controller');

router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.listAllCategories);
router.get('/categories/:id', categoryController.findCategoryById);
router.put('/categories/:id', categoryController.updateCategoryById);
router.delete('/categories/:id', categoryController.deleteCategoryById);

module.exports = router;