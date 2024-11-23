export default function evaluatePronunciation(ctx) {
  const { audioData, text } = ctx.request.body;
  console.log(audioData, text);
  ctx.body = {
    code: 0,
    message: '评测成功',
    data: {
      score: 85, // 综合评分
      feedback: '你的发音清晰，但语调有待改善。',
    },
  };
}
