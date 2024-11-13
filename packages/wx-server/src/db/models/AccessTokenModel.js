const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const accessTokenSchema = new Schema({
  access_token: String,
  token_time: String, // 存储token的时间点
});

const accessTokenModel = model('accessTokenModel', accessTokenSchema);

module.exports = accessTokenModel;
