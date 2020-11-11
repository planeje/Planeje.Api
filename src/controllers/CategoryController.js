const Category = require("../models/Category");
const User = require("../models/User");
const dayjs = require("dayjs");

const Logger = require("./LogController")

module.exports = {
  async index(req, res) {
    const { userId } = req.params;
    const currentDate = dayjs().toISOString();
    const user = await User.findByPk(userId, {
      include: {
        association: 'categories',
        include: {
          association: 'spendingGoals',
          attributes: ['valueAvaible', 'value'],
          where: this.goalDueDate > currentDate
        }
      }
    });
    return res.status(200).send(user.categories);
  },

  async store(req, res) {
    const { userId } = req.params;
    const { name, color } = req.body;

    const user = await User.findByPk(userId);

    if (!user)
      return res.status(400).send({ error: 'User not found' });

    const category = await Category.create({
      name,
      color,
      userId,
    });
    Logger.store({
      userId: userId,
      table: 'Categories',
      action: 'I',
      registerId: category.id
    });
    return res.status(200).send(category);
  },

  async destroy(req, res){
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category)
      res.status(400).send({ error: 'Category not found' });

    Category.destroy({
      where: {
        id: id
      }
    });

    Logger.store({
      userId: category.userId,
      table: 'Categories',
      action: 'D',
      registerId: category.id
    });
    return res.status(200).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, color } = req.body;
    const category = await Category.findByPk(id);

    if (!category)
      return res.status(400).send({ error: 'Category not found' });

    const categoryEdited = await Category.update({
      name: name,
      color: color
    }, {
      where: {
        id: id
      }
    });

    Logger.store({
      userId: category.userId,
      table: 'Categories',
      action: 'U',
      registerId: category.id
    });
    return res.status(200).send(categoryEdited);
  }
}
