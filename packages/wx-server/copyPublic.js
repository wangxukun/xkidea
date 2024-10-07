const fs = require('fs-extra');
async function copyPublic() {
  try {
    await fs.copy(
      './packages/wx-server/public',
      './dist/packages/wx-server/public'
    ); // 假设输出目录是 dist
    console.log('Public directory copied successfully!');
  } catch (err) {
    console.error('Error copying public directory:', err);
  }
}

copyPublic();
