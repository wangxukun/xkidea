const axios = require('axios');
const jwt = require('jsonwebtoken');

const APPID = process.env.EPS_MINI_APP_ID; // 微信小程序的 AppID
const SECRET = process.env.EPS_MINI_APP_SECRET; // 微信小程序的 AppSecret
const JWT_SECRET = process.env.EPS_MINI_APP_JWT_SECRET; // JWT密钥

// 登录接口
export default async function loginwx(ctx) {
  const { code } = ctx.request.body;

  if (!code) {
    ctx.status = 400;
    ctx.body = { message: 'Code is required' };
    return;
  }

  try {
    // 调用微信API，换取 openid 和 session_key
    const wxRes = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session`,
      {
        params: {
          appid: APPID,
          secret: SECRET,
          js_code: code,
          grant_type: 'authorization_code',
        },
      }
    );

    /**
     * session_key: string 会话密钥
     * unionid: string 用户在开放平台的唯一标识符，若当前小程序已绑定到微信开放平台账号下会返回
     * errmsg: string 错误信息
     * openid: string 用户唯一标识
     * errcode int32 错误码
     */
    const { session_key, unionid, errmsg, openid, errcode } = wxRes.data;

    if (openid) {
      // 生成 JWT Token
      const token = jwt.sign({ openid }, JWT_SECRET, { expiresIn: '7d' });

      // 返回 token 给前端
      ctx.body = {
        token,
        unionid,
        openid,
        errcode,
        errmsg,
      };
    } else {
      ctx.status = 400;
      ctx.body = { message: 'Failed to loginwx with WeChat' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Server Error', error };
  }
}
