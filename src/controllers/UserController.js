const User = require("../models/User");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const mailer = require('../modules/mailer')
const Logger = require("./LogController")

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
        const user = await User.findByPk(id,
          {
            attributes: {
              exclude: ['password']
            }
          });
        return res.json(user);
    },
    async store(req, res) {
        const { name, email, password} = req.body;
        const user = await User.create({ name, email, password});

        Logger.store({
          userId: user.userId,
          table: 'Users',
          action: 'I',
          registerId: user.id
        });
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
      const { id } = req.params;
      const { name, email } = req.body;
      const user = await User.findByPk(id);
      if(user){
        User.update({
          name: name,
          email: email
        },{
          where: {
            id: id
          }
        });
        const newUser = await User.findByPk(id);
        
        Logger.store({
          userId: user.userId,
          table: 'Users',
          action: 'U',
          registerId: user.id
        });

        return res.status(200).send(newUser);
      }
      else{
        return res.status(400).send({ error: 'User not found!' })
      }
    },
    async updatePassword(req, res) {
      const { id } = req.params;
      const { password } = req.body;
      const user = await User.findByPk(id);

      if (!user)
        return res.status(400).send({ error: 'User not found!' });

      User.update({
        password: password,
      },{
        where: {
          id: id
        }
      });
      return res.status(201).send();
    },
    async authenticate(req, res) {
      const { email, password } = req.body;
      const user = await User.findOne({ where: {email: email} });

      if (!user)
        return res.status(400).send({ error: 'User not found!' });

      if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' });

      user.password = undefined;
      return res.send({
        user,
        token: generateToken({ id: user.id })
      });
    },
    async forgotPassword(req, res) {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(400).send({ error: 'User not found!' });

      const token = crypto.randomBytes(20).toString('hex');
      const now = new Date();
      now.setHours(now.getHours() + 1);

      await User.update(
        {
          passwordResetToken: token,
          passwordResetExpires: now
        },
        { where: { id: user.id } }
      );

      mailer.messages().send({
        from: 'planejetcc@gmail.com',
        to: user.email,
        subject: 'Equipe Plabeje | Recuperação de senha',
        text: `Utilize o seguinte token para recuperar sua senha: ${token}`
      }, (err, body) => {
        if (err)
          return res.status(400).send({ error: 'Cannot send forgot password email!' });
        return res.status(201).send();
      });
    },
    async resetPassword(req, res) {
      const { email, token, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user)
        return res.status(400).send({ error: 'User not found!' });

      if (token !== user.passwordResetToken)
        return res.status(400).send({ error: 'Token invalid' });

      const now = new Date();
      if (now > user.passwordResetExpires)
        return res.status(400).send({ error: 'Token expired. Generate a new one' });

      const hashPassword = await bcrypt.hash(password, 10);

      User.update(
        {
          password: hashPassword
        },
        { where: { email: email }
      });

      return res.status(201).send();
    }
}
