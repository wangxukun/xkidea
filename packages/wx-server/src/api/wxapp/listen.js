export default function listen(ctx) {
  // 模拟数据听力训练数据
  const listenData = [
    {
      id: 1,
      audioUrl: 'https://www.wxkzd.com/audios/audio1.mp3',
      question: 'What is the main idea of the audio?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option A',
    },
    {
      id: 2,
      audioUrl: 'https://www.wxkzd.com/audios/audio2.mp3',
      question: 'What did the speaker emphasize?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option C',
    },
  ];
  ctx.body = {
    code: 0,
    message: '听力数据获取成功',
    data: listenData,
  };
}
