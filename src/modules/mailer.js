const mailgun = require('mailgun-js');

const { api_key, domain } = require('../config/mail.json');
const mg = mailgun({apiKey: api_key, domain: domain});

module.exports = mg;
