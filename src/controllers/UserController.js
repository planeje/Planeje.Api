const User = require("../models/User");

module.exports = {
    async store(req, res) {
        const { Name, Email, Password} = req.body;

        const user = await User.create({ Name, Email, Password});

        return req.json(users);
    }
}