const mongoose = require('mongoose');

const uri = process.env.EPS_GZH_APP_DB;
db()
  .then(() => console.log('database connect successful'))
  .catch((err) => console.log(err));

async function db() {
  await mongoose.connect(uri);
}
