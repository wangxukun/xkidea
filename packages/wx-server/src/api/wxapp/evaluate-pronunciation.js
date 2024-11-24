const fs = require('fs');
const axios = require('axios');
const crypto = require('crypto');
const uuid = require('uuid');

const YOUDAO_URL = process.env.YOUDAO_URL;
const YOUDAO_APP_KEY = process.env.YOUDAO_APP_KEY;
const YOUDAO_APP_SECRET = process.env.YOUDAO_APP_SECRET;

// 生成签名函数
function generateSign(q, salt, curtime) {
  const truncate = (text) => {
    if (!text) return '';
    const size = text.length;
    return size <= 20
      ? text
      : `${text.slice(0, 10)}${size}${text.slice(size - 10)}`;
  };
  const signStr =
    YOUDAO_APP_KEY + truncate(q) + salt + curtime + YOUDAO_APP_SECRET;
  return crypto.createHash('sha256').update(signStr, 'utf8').digest('hex');
}

export default async function evaluatePronunciation(ctx) {
  const { text } = ctx.request.body;
  const audioFile = ctx.request.files.audio;

  if (!audioFile || !text) {
    ctx.status = 400;
    ctx.body = { error: 'Missing audio or text input' };
    return;
  }

  try {
    // 读取音频文件并转换为 Base64
    const audioData = fs.readFileSync(audioFile.filepath).toString('base64');

    // 获取音频信息
    const sampleRate = 16000; // 假设为 16kHz，可根据实际音频采样率动态获取
    const channel = 1; // 假设单声道
    const format = 'wav'; // 假设音频格式为 WAV

    // 准备有道智云请求参数
    const curtime = Math.floor(Date.now() / 1000).toString();
    const salt = uuid.v4();
    const sign = generateSign(audioData, salt, curtime);

    const data = {
      text,
      appKey: YOUDAO_APP_KEY,
      q: audioData,
      salt,
      curtime,
      sign,
      signType: 'v2',
      langType: 'en', // 假设语言为英文
      rate: sampleRate,
      format,
      channel,
      type: 1,
    };

    // 调用有道智云语音测评 API
    const response = await axios.post(YOUDAO_URL, data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // 返回测评结果
    const result = response.data;
    console.log('Evaluation Result:', result);
    const { score, message } = response.data;
    ctx.body = {
      code: 0,
      message,
      data: {
        score,
        feedback: message || 'Evaluation complete',
      },
    };
  } catch (error) {
    console.error('Error evaluating pronunciation:', error);
    ctx.status = 500;
    ctx.body = { error: 'Failed to evaluate pronunciation' };
  }
}
