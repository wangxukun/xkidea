// 引入 Mongoose 库
const mongoose = require('mongoose');

// 定义用户模型的架构
const userSchema = new mongoose.Schema({
  // 用户在开发平台的唯一标识符，必须，且需唯一，若当前小程序已绑定到微信开放平台账号下会返回
  unionid: {
    type: String,
    unique: true,
  },
  // 用户的唯一标识符，必须，且需唯一
  openid: {
    type: String,
    required: true,
    unique: true,
  },
  // 用户昵称，必须
  nickName: {
    type: String,
    required: true,
    default: '微信用户',
  },
  // 用户头像 URL，必须
  avatarUrl: {
    type: String,
    required: true,
    default: '/images/avatar.png',
  },
  // 学习统计信息
  studyStats: {
    // 总学习时间，默认为 0
    totalTime: { type: Number, default: 0 },
    // 连续学习天数，默认为 0
    daysStreak: { type: Number, default: 0 },
    // 最后学习日期
    lastStudyDate: { type: Date },
    // 听力练习次数，默认为 0
    listenCount: { type: Number, default: 0 },
    // 口语练习次数，默认为 0
    speakCount: { type: Number, default: 0 },
    // 阅读练习次数，默认为 0
    readCount: { type: Number, default: 0 },

    lastPracticeQuestionId: { type: mongoose.Schema.Types.ObjectId },
  },
  // 创建日期，默认为当前日期
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 更新学习统计的方法
userSchema.methods.updateStudyStats = async function (type, questionId) {
  // 获取当前日期（不含时间）
  const today = new Date().setHours(0, 0, 0, 0);
  // 获取最后学习日期（不含时间）
  const lastStudy = this.studyStats.lastStudyDate
    ? new Date(this.studyStats.lastStudyDate).setHours(0, 0, 0, 0)
    : null;

  // 更新连续学习天数
  if (lastStudy) {
    // 计算与最后学习日期的天数差
    const diffDays = Math.floor((today - lastStudy) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      this.studyStats.daysStreak += 1; // 连续学习增加
    } else if (diffDays > 1) {
      this.studyStats.daysStreak = 1; // 重置为 1
    }
  } else {
    this.studyStats.daysStreak = 1; // 第一次学习
  }

  // 根据学习类型更新对应的计数
  switch (type) {
    case 'listen':
      this.studyStats.listenCount += 1; // 听力计数增加
      break;
    case 'speak':
      this.studyStats.speakCount += 1; // 口语计数增加
      break;
    case 'read':
      this.studyStats.readCount += 1; // 阅读计数增加
      break;
  }

  // 更新最后学习日期为当前时间和最后练习的题目ID
  this.studyStats.lastStudyDate = new Date();
  if (questionId) {
    this.studyStats.lastPracticeQuestionId = questionId;
  }
  return this.save(); // 保存更改
};

// 创建用户模型
const User = mongoose.model('User', userSchema);

// 导出用户模型
module.exports = User;
