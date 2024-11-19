import { TextMsg, ImageMsg } from '../../utils/wechat/reply';
import { parseJson } from '../../utils/wechat/receive';
import { Material } from '../../utils/wechat/material';

async function wzl(ctx) {
  try {
    const jsonData = validateInput(ctx.request.body); // 验证输入

    const appId = process.env.EPS_GHZ_APP_ID;
    const appSecret = process.env.EPS_GHZ_APP_SECRET;
    validateEnvironmentVariables(appId, appSecret); // 验证环境变量

    // 获取素材列表
    const options = {
      appId,
      appSecret,
      type: 'image',
      offset: 0,
      count: 20,
    };
    const material = new Material();
    const { data } = await material.getMaterialList(options);

    // 解析消息
    const recMsg = await parseJson(jsonData);
    if (recMsg && recMsg.MsgType === 'text') {
      const toUser = recMsg.FromUserName;
      const fromUser = recMsg.ToUserName;
      // 查找素材
      const media_id = findMediaId(material, data, recMsg.Content);
      // 判断是否找到素材
      if (!media_id) {
        const content =
          '感谢您的关注！请输入雅思，高中，四级或六级获取对应英语听力训练视频。';
        const replyMsg = new TextMsg(toUser, fromUser, content);
        ctx.body = replyMsg.send();
      } else {
        const replyMsg = new ImageMsg(toUser, fromUser, media_id);
        ctx.body = replyMsg.send();
      }
    } else {
      console.log('暂且不处理');
      ctx.body = 'success';
    }
  } catch (error) {
    console.error(`Error in wzl function: ${error.start}`);
    if (error instanceof SyntaxError) {
      ctx.body = 'Invalid JSON data';
    } else if (
      error.message.includes('Missing required environment variables')
    ) {
      ctx.body = 'Internal server error';
    } else {
      ctx.body = error.message;
    }
  }
}

/**
 * 验证输入
 * @param input
 * @returns {*}
 */
function validateInput(input) {
  if (typeof input !== 'object' || input === null) {
    throw new Error('Invalid JSON data');
  }
  return input;
}

/**
 * 验证环境变量
 * @param appId
 * @param appSecret
 */
function validateEnvironmentVariables(appId, appSecret) {
  if (!appId || !appSecret) {
    throw new Error('Missing required environment variables');
  }
}

/**
 * 查找素材
 * @param material
 * @param data
 * @param content
 * @returns {*}
 */
function findMediaId(material, data, content) {
  return material.findMediaIdByName(data, `${content}.png`, [
    '雅思.png',
    '高中.png',
    '四级.png',
    '六级.png',
  ]);
}

module.exports = {
  wzl,
};
