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
    }
}