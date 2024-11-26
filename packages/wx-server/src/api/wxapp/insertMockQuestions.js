const mongoose = require('mongoose');
const PronunciationEvaluation = require('../../db/models/PronunciationEvaluation');

export default async function insertMockQuestions() {
  const count = await PronunciationEvaluation.countDocuments();
  if (count === 0) {
    const questions = [
      {
        topic: 'Greetings',
        englishText: 'Have a good day',
        chineseText: '祝你有美好的一天',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        topic: 'Greetings',
        englishText: 'How are you doing?',
        chineseText: '你好吗？',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        topic: 'Greetings',
        englishText: 'This is a practice sentence',
        chineseText: '这个是练习句',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        topic: 'Second',
        englishText: 'Can you repeat that?',
        chineseText: '你能重复一遍吗？',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        topic: 'Second',
        englishText: 'What is your name?',
        chineseText: '你的名字是什么？',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
    ];
    await PronunciationEvaluation.insertMany(questions);
    console.log('Mock questions inserted');
  }
}
