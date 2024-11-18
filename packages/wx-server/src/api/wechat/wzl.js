import { TextMsg } from '../../utils/wechat/reply';
import { parseXml } from '../../utils/wechat/receive';

async function wzl(ctx) {
  try {
    const webData = ctx.request.body.xml; // POST方式获取的数据
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
