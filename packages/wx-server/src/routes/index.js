import Router from 'koa-router';
import wxk from '../api/wechat/wxk';
import signJsapi from '../api/wechat/signJsapi';
import login from '../api/wxapp/login';
import banners from '../api/wxapp/banners';
const UserModel = require('../db/models/UserModel');

const router = new Router();

// enable routing
// 微信公众号服务器主地址，能够正确响应微信发送的token验证
router.get('/api/wechat/wxk', wxk);

router.get('/api/wechat/jsapi', signJsapi);

// test mongodb save data
router.post('/reg', function (ext) {
  console.log(ext.request.body);
  const { user, pwd } = ext.request.body;
  new UserModel({
    user: user,
    pwd: pwd,
  })
    .save()
    .then(() => {
      ext.body = {
        code: 1,
        msg: 'reg successful',
      };
    });
});

// 微信小程序用户登录接口
router.post('/api/wxapp/login', login);

// 微信小程序首页：轮播图接口
router.get('/api/wxapp/banners', banners);

export default router;
