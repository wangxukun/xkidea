const mongoose = require('mongoose');

const uri = process.env.EPS_GZH_APP_DATABASE_URL;
db().catch((err) => console.log(err));

async function db() {
  await mongoose.connect(uri);
}
