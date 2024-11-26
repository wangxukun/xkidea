/**
 * @description 语音评估模型
 **/

const mongoose = require('mongoose');

// 定义 Schema
const pronunciationEvaluationSchema = new mongoose.Schema(
  {
    englishText: { type: String, required: true }, // 题目文本
    chineseText: { type: String, required: true }, // 题目中文翻译文本
    audioUrl: { type: String, required: true }, // 演示音频链接
    topic: { type: String, required: true }, // 所属主题
  },
  { timestamps: true }
); // 自动添加创建和更新时间

// 创建模型
const PronunciationEvaluation = mongoose.model(
  'PronunciationEvaluation',
  pronunciationEvaluationSchema
);

module.exports = PronunciationEvaluation;
