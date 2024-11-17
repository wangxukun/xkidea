const xml2js = require('xml2js');

class Msg {
  constructor(xmlData) {
    this.ToUserName = xmlData.xml.ToUserName[0];
    this.FromUserName = xmlData.xml.FromUserName[0];
    this.CreateTime = xmlData.xml.CreateTime[0];
    this.MsgType = xmlData.xml.MsgType[0];
    this.MsgId = xmlData.xml.MsgId[0];
  }
}

class TextMsg extends Msg {
  constructor(xmlData) {
    super(xmlData);
    this.Content = xmlData.xml.Content[0];
  }
}

class ImageMsg extends Msg {
  constructor(xmlData) {
    super(xmlData);
    this.PicUrl = xmlData.xml.PicUrl[0];
    this.MediaId = xmlData.xml.MediaId[0];
  }
}

async function parseXml(webData) {
  if (!webData) {
    return null;
  }

  const parser = new xml2js.Parser();
  try {
    const xmlData = await parser.parseStringPromise(webData);
    const msgType = xmlData.xml.MsgType[0];

    if (msgType === 'text') {
      return new TextMsg(xmlData);
    } else if (msgType === 'image') {
      return new ImageMsg(xmlData);
    }
    return null;
  } catch (error) {
    console.error('Parse XML error:', error);
    return null;
  }
}

module.exports = {
  parseXml,
  Msg,
  TextMsg,
  ImageMsg,
};
