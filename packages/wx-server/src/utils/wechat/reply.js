const xml2js = require('xml2js');
const builder = new xml2js.Builder();

class TextMsg {
  constructor(toUser, fromUser, content) {
    this.msg = {
      xml: {
        ToUserName: toUser,
        FromUserName: fromUser,
        CreateTime: Date.now(),
        MsgType: 'text',
        Content: content,
      },
    };
  }

  send() {
    return builder.buildObject(this.msg);
  }
}

module.exports = {
  TextMsg,
};
