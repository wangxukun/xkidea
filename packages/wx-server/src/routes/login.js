const axios = require('axios');
// const jwt = require('jsonwebtoken');

const APPID = process.env.EPS_MINI_APP_ID; // 微信小程序的 AppID
const SECRET = process.env.EPS_MINI_APP_SECRET; // 微信小程序的 AppSecret

// 登录接口
export default async function login(ctx) {
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

    const { openid, session_key } = wxRes.data;

    if (openid) {
      // 生成 JWT Token
      // const token = jwt.sign({ openid }, JWT_SECRET, { expiresIn: '7d' });

      // 返回 token 给前端
      ctx.body = {
        // token,
        openid,
      };
    } else {
      ctx.status = 400;
      ctx.body = { message: 'Failed to login with WeChat' };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Server Error', error };
  }
}
