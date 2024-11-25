const mongoose = require('mongoose');
const PracticeQuestion = require('../../db/models/PracticeQuestions');

export default async function insertMockQuestions() {
  const count = await PracticeQuestion.countDocuments();
  if (count === 0) {
    const questions = [
      {
        text: 'Have a good day',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        text: 'How are you doing?',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        text: 'This is a practice sentence',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        text: 'Can you repeat that?',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        text: 'What is your name?',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
    ];
    await PracticeQuestion.insertMany(questions);
    console.log('Mock questions inserted');
  }
}
