const app = require('./app');
require('dotenv').config();
const port = process.env.PORT || 3000;

require('./src/database/');

app.listen(port , () => {
  console.log('Aplicação executando na porta', port);
});
