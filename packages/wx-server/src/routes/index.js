import Router from 'koa-router';
const xmlParser = require('koa-xml-body');
import wxk from '../api/wechat/wxk';
import { wzl } from '../api/wechat/wzl';
import signJsapi from '../api/wechat/signJsapi';
import login from '../api/wxapp/login';
import banners from '../api/wxapp/banners';
import addUser from '../api/addUser';
// import insertMockQuestions from '../api/wxapp/insertMockQuestions';
import listen from '../api/wxapp/listen';
import leaderboard from '../api/wxapp/leaderboard';
import evaluatePronunciation from '../api/wxapp/evaluate-pronunciation';
import getPronunciationEvaluationData from '../api/wxapp/get-pronunciation-evaluation-data';
import updatePracticeRecord from '../api/wxapp/update-practice-record';

const router = new Router();

// enable routing
// 微信公众号服务器主地址，能够正确响应微信发送的token验证
router.get('/api/wechat/wxk', wxk);

// 微信公众号服务器主地址，处理粉丝给公众号发送的消息
router.post('/api/wechat/wxk', wzl);

// 微信鉴证
router.get('/api/wechat/jsapi', signJsapi);

// 增加微信公众号或微信小程序用户到数据库
router.post('/api/addUser', addUser);

// 模拟数据
// router.get('/api/wxapp/insertMockQuestions', insertMockQuestions);

// 微信小程序用户登录接口
router.post('/api/wxapp/login', login);

// 微信小程序首页：轮播图接口
router.get('/api/wxapp/banners', banners);

// 微信小程序获取听力数据
router.get('/api/wxapp/listen', listen);

// 微信小程序获取排行榜数据
router.get('/api/wxapp/leaderboard', leaderboard);

// 评估发音
router.post('/api/wxapp/evaluate-pronunciation', evaluatePronunciation);

// 获取用于发音评估的数据
router.get(
  '/api/wxapp/get-pronunciation-evaluation-data',
  getPronunciationEvaluationData
);

// 提交练习记录
router.post('/api/wxapp/update-practice-record', updatePracticeRecord);

export default router;
