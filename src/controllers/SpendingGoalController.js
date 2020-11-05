const SpendingGoal = require("../models/SpendingGoal");
const Category = require("../models/Category");
const Logger = require("./LogController")

module.exports = {
  async index(req, res) {
    const { categoryId } = req.params;

    const category = await Category.findByPk(categoryId, {
      include: { association: 'spendingGoals' }
    });
    return res.status(200).send(category.spendingGoals);
  },

  async store(req, res) {
    const { userId, categoryId } = req.params;
    const {
      description,
      goalDueDate,
      value
    } = req.body;

    const category = await Category.findByPk(categoryId);

    if (!category)
      return res.status(400).send({ error: 'Category not found' });

    const goal = await SpendingGoal.create({
      description,
      goalDueDate,
      value,
      goalDate: new Date(),
      valueAvaible: value,
      userId,
      categoryId
    });

    Logger.store({
      userId: userId,
      table: 'SpendingGoals',
      action: 'I',
      registerId: goal.id
    });

    return res.status(200).send(goal);
  },

  async destroy(req, res) {
    const { categoryId, id } = req.params;
    const goal = await SpendingGoal.findByPk(id);

    if(!goal)
      return res.status(400).send({ error: 'Goal not found' });

    await SpendingGoal.destroy({
      where: {
        id,
        categoryId
      }
    });

    Logger.store({
      userId: goal.userId,
      table: 'SpendingGoals',
      action: 'D',
      registerId: goal.id
    });

    return res.status(200).send();
  },

  async update(req, res) {
    const { categoryId, id } = req.params;
    const {
      description,
      goalDueDate,
      value
    } = req.body;

    const goal = await SpendingGoal.findByPk(id);

    if(!goal)
      return res.status(400).send({ error: 'Goal not found' });

    await SpendingGoal.update({
      description,
      goalDueDate,
      value
    }, {
      where: {
        id,
        categoryId
      }
    });

    const goalEdited = await SpendingGoal.findByPk(id);

    Logger.store({
      userId: goal.userId,
      table: 'SpendingGoals',
      action: 'U',
      registerId: goal.id
    });
    return res.status(200).send(goalEdited);
  }
}
