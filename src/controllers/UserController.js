const User = require("../models/User");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    });
};

module.exports = {    
    async index(req, res) {
        const user = await User.findAll({
            attributes: {
                exclude: ['password']
            },
        });
        return res.json(user)
    },
    async one(req, res) {
        const id = req.params.id;
        const user = await User.findByPk(id);
        delete user.password;
        return res.json(user);
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
    },
    async authenticate(req, res) {
        const id = req.params.id;
        const { email, password } = req.body;
        const user = await User.findByPk(id);

        if (!user)
            return res.status(400).send({ error: 'User not found!' });

        if (password !== user.password)
            return res.status(400).send({ error: 'Invalid password' });

        user.password = null;
        return res.send({
            user,
            tokent: generateToken({ id: user.id })
        });
    }
}