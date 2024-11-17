const reply = require('../../utils/wechat/reply');
const receive = require('../../utils/wechat/receive');

export default async function wzl(ctx) {
  try {
    const webData = ctx.request.rawBody; // 获取原始请求体
    console.log('Handle Post webdata is ', webData);

    // 解析XML数据
    const recMsg = await receive.parse_xml(webData);

    if (recMsg instanceof receive.Msg && recMsg.MsgType === 'text') {
      const toUser = recMsg.FromUserName;
      const fromUser = recMsg.ToUserName;
      const content = `${recMsg.FromUserName}发来的信息是：${recMsg.Content}`;

      const replyMsg = new reply.TextMsg(toUser, fromUser, content);
      ctx.type = 'application/xml';
      ctx.body = replyMsg.send();
    } else {
      console.log('暂且不处理');
      ctx.body = 'success';
    }
  } catch (error) {
    console.error('Error processing request:', error);
    ctx.body = error.message;
  }
}
