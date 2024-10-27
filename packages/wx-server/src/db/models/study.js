// 引入 Mongoose 库
const mongoose = require('mongoose');

// 定义学习记录模型的架构
const studyRecordSchema = new mongoose.Schema({
  // 关联用户的 ID，必须，引用 User 模型
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // 学习类型，必须，限制为指定的枚举值
  type: {
    type: String,
    enum: ['listen', 'speak', 'read'], // 可选值：听力、口语、阅读
    required: true,
  },
  // 内容 ID，必须，标识学习的内容
  contentId: {
    type: String,
    required: true,
  },
  // 学习时长，单位为分钟，必须
  duration: {
    type: Number,
    required: true,
  },
  // 学习成绩，可选
  score: {
    type: Number,
  },
  // 学习是否完成，默认为 false
  completed: {
    type: Boolean,
    default: false,
  },
  // 创建日期，默认为当前日期
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 创建学习记录模型
const StudyRecord = mongoose.model('StudyRecord', studyRecordSchema);

// 导出学习记录模型
module.exports = StudyRecord;
