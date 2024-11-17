const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false });

class Msg {
  constructor(msgData) {
    this.ToUserName = msgData.ToUserName;
    this.FromUserName = msgData.FromUserName;
    this.CreateTime = msgData.CreateTime;
    this.MsgType = msgData.MsgType;
    this.Content = msgData.Content;
  }
}

async function parse_xml(xmlData) {
  try {
    const result = await parser.parseStringPromise(xmlData);
    const msgData = result.xml;
    return new Msg(msgData);
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw error;
  }
}

module.exports = {
  Msg,
  parse_xml,
};
