import User from '../../db/models/user';
import { userInfo } from 'node:os';

const axios = require('axios');
const jwt = require('jsonwebtoken');

const APPID = process.env.EPS_MINI_APP_ID; // 微信小程序的 AppID
const SECRET = process.env.EPS_MINI_APP_SECRET; // 微信小程序的 AppSecret
const JWT_SECRET = process.env.EPS_MINI_APP_JWT_SECRET; // JWT密钥

// 登录接口
export default async function login(ctx) {
  const { code, nickName, avatarUrl } = ctx.request.body;

  if (!code || !nickName || !avatarUrl) {
    ctx.status = 400;
    ctx.body = { success: false, message: '缺少必要的参数' };
    return;
  }

  try {
    // 通过code调用微信API，换取 openid 和 session_key
    const response = await axios.get(
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
     * openid: string 用户唯一标识
     * errcode int32 错误码
     */
    const { session_key, unionid, openid } = response.data;

    if (!openid) {
      ctx.status = 500;
      ctx.body = { success: false, message: '微信登录失败，未获取到 openid' };
      return;
    }

    // 查询用户是否存在
    let user = await User.findOne({ openid });

    if (!user) {
      // 如果用户不存在，创建新用户
      user = new User({
        unionid: unionid || null, // UnionID 可能为空
        openid,
        nickName,
        avatarUrl,
      });
      await user.save();
    }

    // 生成 JWT Token
    const token = jwt.sign(
      {
        openid,
        nickName,
        avatarUrl,
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // 返回 token 给前端
    ctx.body = {
      success: true,
      message: '微信登录成功',
      token,
      user,
    };
  } catch (error) {
    console.error('微信登录接口调用失败', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: '服务器错误',
      error: error.message,
    };
  }
}
