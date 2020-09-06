const Category = require("../models/Category");
const User = require("../models/User");


module.exports = {
    async index( req, res){
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: { association: 'categories' }
        })

        return res.json(user.categories)
    },

    async store(req, res) {
        const { userId } = req.params;
        const { name, color } = req.body;
        
        const user = await User.findByPk(userId);
        
        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        console.log("chegou aqui 1 ");
        console.log(name)
        console.log(color);
        const category = await Category.create({
            name,
            color,
            userId,
        });

        console.log("chegou aqui 2 ");
        console.log(category);
        return res.json(category);
    },

    async destroy(req, res){
        const {id} = req.params;
        const category = await Category.findByPk(id)
        if(category){
            Category.destroy({
                where: {
                    id: id
                }
            })
            return res.json('Category '+ id + ' deleted');
        }
        else{
            return res.json('Category not found')
        }
    },

    async update(req, res){
        const {id} = req.params;
        const { name, color } = req.body;
        const category = await Category.findByPk(id)
        if(category){
            Category.update({
                name: name,
                color: color
            },{
                where: {
                    id: id
                }
            })
            return res.json('Category '+ id + ' updated')
        }
        else{
            return res.json('Category not found')
        }
    }
    


}