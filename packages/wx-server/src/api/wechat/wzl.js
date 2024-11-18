import { TextMsg } from '../../utils/wechat/reply';
import { parseJson } from '../../utils/wechat/receive';
import { Material } from '../../utils/wechat/material';

async function wzl(ctx) {
  try {
    const jsonData = ctx.request.body; // POST方式获取的数据,JSON串
    console.log('Handle Post jsonData is ', jsonData);

    const options = {
      appId: process.env.EPS_GZH_APP_ID,
      appSecret: process.env.EPS_GZH_APP_SECRET,
      type: 'image',
      offset: 0,
      count: 20,
    };

    const { data } = await new Material().getMaterialList(options);
    console.log('data', data);

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
