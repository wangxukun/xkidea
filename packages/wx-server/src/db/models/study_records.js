// 引入 Mongoose 库
const mongoose = require('mongoose');

// 定义学习记录模型的架构
const studyRecordsSchema = new mongoose.Schema({
  // 用户的唯一标识符，必须，且需唯一
  openid: {
    type: String,
    required: true,
    unique: true,
  },
  // 单词的唯一标识，必须
  wordId: {
    type: String,
    required: true,
  },
  // 首次学习的时间（时间戳）
  firstLearnedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 更新学习统计的方法
userSchema.methods.updateStudyStats = async function (type) {
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

  // 更新最后学习日期为当前时间
  this.studyStats.lastStudyDate = new Date();
  return this.save(); // 保存更改
};

// 创建用户模型
const User = mongoose.model('User', userSchema);

// 导出用户模型
module.exports = User;
