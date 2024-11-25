const User = require('../../db/models/user');

/**
 * 更新学习记录
 * @param ctx
 * @returns {Promise<void>}
 */
export default async function updatePracticeRecord(ctx) {
  try {
    const { openid, questionId, type } = ctx.request.body;

    // 查找用户
    const user = await User.findOne({ openid });
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }

    // 更新学习记录
    await user.updateStudyStats(type, questionId);

    ctx.body = { message: 'Practice record updated', user };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      message: 'Error updating practice record',
      error: err.message,
    };
  }
}
