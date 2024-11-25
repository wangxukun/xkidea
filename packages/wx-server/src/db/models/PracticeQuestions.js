const mongoose = require('mongoose');

const practiceQuestionSchema = new mongoose.Schema({
  text: {
    type: String, // 题目文本
    required: true,
  },
  audioUrl: {
    type: String, // 演示音频链接
    required: true,
  },
});

// 创建练习题目模型
const PracticeQuestion = mongoose.model(
  'PracticeQuestion',
  practiceQuestionSchema
);

module.exports = PracticeQuestion;
