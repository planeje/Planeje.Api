const User = require("../models/User");
const Log = require("../models/Log");

module.exports = {
    async index(req, res) {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        include: { association: 'logs' }
      });
      return res.status(200).send(user.logs);
    },

    async store(data) {
      console.log('criar log', data);
        Log.create({
            userId:data.userId,
            table: data.table,
            action: data.action,
            registerId: data.registerId
          });
    },
}
