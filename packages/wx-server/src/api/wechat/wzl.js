import { TextMsg } from '../../utils/wechat/reply';
import { parseJson } from '../../utils/wechat/receive';

async function wzl(ctx) {
  try {
    const jsonData = ctx.request.body; // POST方式获取的数据,JSON串
    console.log('Handle Post jsonData is ', jsonData);

    const recMsg = await parseJson(jsonData);
    if (recMsg && recMsg.MsgType === 'text') {
      const toUser = recMsg.FromUserName;
      const fromUser = recMsg.ToUserName;
      const content = '感谢您的关注！';
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
