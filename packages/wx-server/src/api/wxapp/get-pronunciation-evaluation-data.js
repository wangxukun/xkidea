const User = require('../../db/models/user');
const PronunciationEvaluation = require('../../db/models/PronunciationEvaluation');

// 按 topic 分组查询
async function groupByTopic() {
  try {
    const results = await PronunciationEvaluation.aggregate([
      {
        $group: {
          _id: '$topic', // 按 topic 分组
          count: { $sum: 1 }, // 每组记录数
          items: { $push: '$$ROOT' }, // 将分组内的所有记录保存到 items 字段
        },
      },
    ]);
    console.log('Grouped Results:', results);
    return results;
  } catch (err) {
    console.error('Error grouping data by topic:', err);
  }
}

/**
 * 获取练习数据
 * @param {*} ctx
 */
export default async function getPronunciationEvaluationData(ctx) {
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
    const pronunciationEvaluations = await groupByTopic();

    // 获取上次练习的题目
    const lastPracticeQuestionId = user.studyStats.lastPracticeQuestionId;
    let lastQuestion;
    if (lastPracticeQuestionId != null) {
      lastQuestion = await PronunciationEvaluation.findById(
        lastPracticeQuestionId
      );
    }

    ctx.body = {
      lastQuestion: lastQuestion || null,
      pronunciationEvaluations, // 包括 topic, text 和 audioUrl 字段
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = {
      message: 'Error retrieving practice data',
      error: err.message,
    };
  }
}
