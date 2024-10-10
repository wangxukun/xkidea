const mongoose = require('mongoose');
const { Schema } = mongoose;

const jsapiTicketSchema = new Schema({
  ticket: String,
  ticket_time: String,
});
const jsapiTicketModel = mongoose.model('jsapiTicketModel', jsapiTicketSchema);

module.exports = jsapiTicketModel;
