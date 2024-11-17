const xml2js = require('xml2js');
const reply = require('../../utils/wechat/reply');
const receive = require('../../utils/wechat/receive');

async function wzl(ctx) {
  try {
    const webData = ctx.request.body;
    console.log('Handle Post webdata is ', webData);

    const recMsg = await parseXml(webData);
    if (recMsg && recMsg.MsgType === 'text') {
      const toUser = recMsg.FromUserName;
      const fromUser = recMsg.ToUserName;
      const content = 'test';
      const replyMsg = new TextMsg(toUser, fromUser, content);
      ctx.body = replyMsg.send();
    } else {
      console.log('暂且不处理');
      ctx.body = 'success';
    }
  } catch (error) {
    console.error(error);
    ctx.body = error.message;
  }
}

module.exports = {
  wzl,
};
