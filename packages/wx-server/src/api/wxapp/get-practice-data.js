const User = require('../../db/models/user');
const PracticeQuestion = require('../../db/models/PracticeQuestions');

/**
 * 获取练习数据
 * @param {*} ctx
 */
export default async function getPracticeData(ctx) {
  try {
    const { openid } = ctx.query;

    // 获取用户数据
    const user = await User.findOne({ openid });
    if (!user) {
      ctx.status = 404;
      ctx.body = { message: 'User not found' };
      return;
    }

    // 获取所有题目
    const questions = await PracticeQuestion.find();

    ctx.body = {
      lastQuestionId: user.studyStats.lastPracticeQuestionId || null,
      questions, // 包括 text 和 audioUrl 字段
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      message: 'Error retrieving practice data',
      error: err.message,
    };
  }
}
