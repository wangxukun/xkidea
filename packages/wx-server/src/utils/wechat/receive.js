class Msg {
  constructor(jsonData) {
    this.ToUserName = jsonData.xml.ToUserName[0];
    this.FromUserName = jsonData.xml.FromUserName[0];
    this.CreateTime = jsonData.xml.CreateTime[0];
    this.MsgType = jsonData.xml.MsgType[0];
    this.MsgId = jsonData.xml.MsgId[0];
  }
}

class TextMsg extends Msg {
  constructor(jsonData) {
    super(jsonData);
    this.Content = jsonData.xml.Content[0];
  }
}

class ImageMsg extends Msg {
  constructor(jsonData) {
    super(jsonData);
    this.PicUrl = jsonData.xml.PicUrl[0];
    this.MediaId = jsonData.xml.MediaId[0];
  }
}

async function parseJson(webData) {
  if (!webData) {
    return null;
  }

  try {
    const msgType = webData.xml.MsgType[0];

    if (msgType === 'text') {
      return new TextMsg(webData);
    } else if (msgType === 'image') {
      return new ImageMsg(webData);
    }
    return null;
  } catch (error) {
    console.error('Parse XML error:', error);
    return null;
  }
}

module.exports = {
  parseJson,
  Msg,
  TextMsg,
  ImageMsg,
};
