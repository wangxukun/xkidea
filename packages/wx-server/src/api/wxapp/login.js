const axios = require('axios');
const jwt = require('jsonwebtoken');

const APPID = process.env.EPS_MINI_APP_ID; // 微信小程序的 AppID
const SECRET = process.env.EPS_MINI_APP_SECRET; // 微信小程序的 AppSecret
const JWT_SECRET = process.env.EPS_MINI_APP_JWT_SECRET; // JWT密钥

// 登录接口
export default async function login(ctx) {
  const { code, userInfo } = ctx.request.body;

  if (!code) {
    ctx.status = 400;
    ctx.body = { message: 'Code is required' };
    return;
  }

  try {
    // 通过code调用微信API，换取 openid 和 session_key
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
    const { session_key, unionid, openid } = wxRes.data;

    if (openid) {
      // 生成 JWT Token
      const token = jwt.sign(
        {
          openid,
          ...userInfo,
        },
        JWT_SECRET,
        {
          expiresIn: '7d',
        }
      );

      // 返回 token 给前端
      ctx.body = {
        code: 0,
        message: '微信登录成功',
        data: { token },
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        message: '微信登录失败',
      };
    }
  } catch (error) {
    console.error('微信登录失败', error);
    ctx.status = 500;
    ctx.body = {
      code: 500,
      message: '微信登录失败',
    };
  }
}
