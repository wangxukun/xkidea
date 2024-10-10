const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const accessTokenSchema = new Schema({
  access_token: String,
  token_time: String,
});

const accessTokenModel = model('accessTokenModel', accessTokenSchema);

module.exports = accessTokenModel;
