const mongoose = require('mongoose');

const uri = `mongodb://${process.env.EPS_GZH_APP_DB_USER}:${process.env.EPS_GZH_APP_DB_PSW}@${process.env.EPS_GZH_APP_DB_IP}:${process.env.EPS_GZH_APP_DB_PORT}/${process.env.EPS_GZH_APP_DB_NAME}`;
console.log(uri);
db()
  .then(() => console.log('database connect successful'))
  .catch((err) => console.log(err));

async function db() {
  await mongoose.connect(uri);
}
