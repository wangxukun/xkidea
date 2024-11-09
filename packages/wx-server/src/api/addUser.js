const User = require('../db/models/user');
export default async function addUser(ctx) {
  console.log(ctx.request.body);
  const { unionid, openid } = ctx.request.body;
  new User({
    unionid,
    openid,
  })
    .save()
    .then(() => {
      ctx.body = {
        code: 1,
        message: '增加用户成功',
      };
    });
}
