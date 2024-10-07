const fs = require('fs-extra');
async function copyPublic() {
  try {
    await fs.copy('./apps/wx-server/public', './dist/apps/wx-server/public'); // 假设输出目录是 dist
    console.log('Public directory copied successfully!');
  } catch (err) {
    console.error('Error copying public directory:', err);
  }
}

copyPublic();
