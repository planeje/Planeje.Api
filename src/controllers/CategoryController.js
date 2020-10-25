const Category = require("../models/Category");
const User = require("../models/User");


module.exports = {
  async index(req, res) {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {
      include: { association: 'categories' }
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

    return res.status(200).send(categoryEdited);
  }
}
