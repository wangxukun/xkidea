const mongoose = require('mongoose');
const PronunciationEvaluation = require('../../db/models/PronunciationEvaluation');

export default async function insertMockQuestions() {
  const count = await PronunciationEvaluation.countDocuments();
  if (count === 0) {
    const questions = [
      {
        topic: 'Greetings',
        text: 'Have a good day',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        topic: 'Greetings',
        text: 'How are you doing?',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        topic: 'Greetings',
        text: 'This is a practice sentence',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        topic: 'Second',
        text: 'Can you repeat that?',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
      {
        topic: 'Second',
        text: 'What is your name?',
        audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      },
    ];
    await PronunciationEvaluation.insertMany(questions);
    console.log('Mock questions inserted');
  }
}
