//const { destroy, update } = require("../models/User");
const User = require("../models/User");

module.exports = {
    async index(req, res) {
        const user = await User.findAll();
        return res.json(user)
    },
    async store(req, res) {
        const { name, email, password} = req.body;

        const user = await User.create({ name, email, password});

        return res.json(user);
    },
    async destroy(req, res) {
        const id = req.params.id;
        const user = await User.findByPk(id)
        if(user){
            User.destroy({
                where: {
                    id: id
                }
            })
            return res.json('User '+ id + ' deleted');
        }
        else{
            return res.json('User not found')
        }
    },
    async update(req, res) {
        const {id} = req.params;
        const { name, email, password } = req.body;
        const user = await User.findByPk(id)
        if(user){
            User.update({
                name: name,
                email: email,
                password: password
            },{
                where: {
                    id: id
                }
            })
            return res.json('User Account '+ id + ' updated')
        }
        else{
            return res.json('User Account not found')
        }
    }
}