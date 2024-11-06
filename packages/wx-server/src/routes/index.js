import Router from 'koa-router';
import wxk from './wxk';
import signJsapi from './signJsapi';
import loginwx from '../api/./loginwx';
import banners from '../api/banners';
const UserModel = require('../db/models/UserModel');

const router = new Router();

// enable routing
router.get('/wxk', wxk);
router.get('/jsapi', signJsapi);

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
router.post('/loginwx', loginwx);

// 微信小程序首页：轮播图接口
router.get('/api/banners', banners);

export default router;
