import Router from 'koa-router';
import wxk from './wxk';
import signJsapi from './signJsapi';
import login from './login';
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

// 微信小程序登录接口
router.post('/login', login);

export default router;
