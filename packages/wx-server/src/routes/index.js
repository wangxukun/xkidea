import Router from 'koa-router';
import wxk from './wxk';
import signJsapi from './signJsapi';
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

export default router;
