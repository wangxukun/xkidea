// reply.js
class Msg {
  constructor() {}

  send() {
    return 'success';
  }
}

class TextMsg extends Msg {
  constructor(toUserName, fromUserName, content) {
    super();
    this._dict = {
      ToUserName: toUserName,
      FromUserName: fromUserName,
      CreateTime: Math.floor(Date.now() / 1000),
      Content: content,
    };
  }

  send() {
    const xmlForm = `
            <xml>
                <ToUserName><![CDATA[${this._dict.ToUserName}]]></ToUserName>
                <FromUserName><![CDATA[${this._dict.FromUserName}]]></FromUserName>
                <CreateTime>${this._dict.CreateTime}</CreateTime>
                <MsgType><![CDATA[text]]></MsgType>
                <Content><![CDATA[${this._dict.Content}]]></Content>
            </xml>
        `;
    return xmlForm;
  }
}

class ImageMsg extends Msg {
  constructor(toUserName, fromUserName, mediaId) {
    super();
    this._dict = {
      ToUserName: toUserName,
      FromUserName: fromUserName,
      CreateTime: Math.floor(Date.now() / 1000),
      MediaId: mediaId,
    };
  }

  send() {
    const xmlForm = `
            <xml>
                <ToUserName><![CDATA[${this._dict.ToUserName}]]></ToUserName>
                <FromUserName><![CDATA[${this._dict.FromUserName}]]></FromUserName>
                <CreateTime>${this._dict.CreateTime}</CreateTime>
                <MsgType><![CDATA[image]]></MsgType>
                <Image>
                <MediaId><![CDATA[${this._dict.MediaId}]]></MediaId>
                </Image>
            </xml>
        `;
    return xmlForm;
  }
}

module.exports = {
  Msg,
  TextMsg,
  ImageMsg,
};
