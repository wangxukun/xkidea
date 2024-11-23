export default function leaderboard(ctx) {
  // 模拟数据听力训练数据
  const leaderboard = [
    { username: 'Olivia', correctCount: 20, completedCount: 25 },
    { username: 'Scoot', correctCount: 17, completedCount: 30 },
    { username: 'John', correctCount: 30, completedCount: 37 },
    { username: 'Sophia', correctCount: 20, completedCount: 27 },
    { username: 'Ava', correctCount: 18, completedCount: 25 },
    { username: 'Michael', correctCount: 15, completedCount: 20 }, // 当前用户
    { username: 'Lucas', correctCount: 23, completedCount: 28 },
    { username: 'James', correctCount: 19, completedCount: 41 },
  ];
  ctx.body = {
    code: 0,
    message: '排行榜数据获取成功',
    data: leaderboard,
  };
}
