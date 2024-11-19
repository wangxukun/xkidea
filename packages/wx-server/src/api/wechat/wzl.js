import { TextMsg, ImageMsg } from '../../utils/wechat/reply';
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

      let replyMsg;
      switch (recMsg.Content) {
        case '雅思':
          replyMsg = new ImageMsg(
            toUser,
            fromUser,
            'S05-G8-3WTrOHeVHi2Pvucc-JRbjal3wkTxmmoiTX0zD8jb0wBCIaWZBkGruoqPD'
          );
          ctx.body = replyMsg.send();
          break;
        case '高中':
          replyMsg = new ImageMsg(
            toUser,
            fromUser,
            'S05-G8-3WTrOHeVHi2PvubdeZZ4cOPFyn3-F-5nckR4EB7AjcCnmwQKCnoZGSSfu'
          );
          ctx.body = replyMsg.send();
          break;
        case '四级':
          replyMsg = new ImageMsg(
            toUser,
            fromUser,
            'S05-G8-3WTrOHeVHi2PvuYJ3cchx1NvVInOuDq5d418g61V3rvLF7XdpRdhaU_Nd'
          );
          ctx.body = replyMsg.send();
          break;
        case '六级':
          replyMsg = new ImageMsg(
            toUser,
            fromUser,
            'S05-G8-3WTrOHeVHi2PvuZVgtGF23JArPcakqOGVLUtkiqaT9Sd3KOx4bXC9e1HJ'
          );
          ctx.body = replyMsg.send();
          break;
        default:
          const content =
            '感谢您的关注！请输入雅思，高中，四级或六级获取对应英语听力训练视频。';
          replyMsg = new TextMsg(toUser, fromUser, content);
          ctx.body = replyMsg.send();
          break;
      }
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
