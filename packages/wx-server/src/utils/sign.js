import axios from 'axios';
import * as crypto from 'crypto';

// https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

async function getAccess_token(appId, appSecret) {
  const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
  const token_data = await axios.get(tokenUrl);
  const access_token = token_data.data.access_token;
  console.log('access_token', access_token);
  return access_token;
}

async function getJsapi_ticket(access_token) {
  const tickeUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
  const ticket_data = await axios(tickeUrl);
  console.log('jsapi_ticket', ticket_data);
  return ticket_data.data.ticket;
}

function createNonceStr() {
  return Math.random().toString(36).substring(2, 15);
}

function createTimestamp() {
  return parseInt(new Date().getTime() / 1000) + '';
}

// 根据官方文档要求处理拼接数据
function splice(obj) {
  let keys = Object.keys(obj);
  keys = keys.sort();
  const newObj = {};
  keys.forEach((key) => {
    newObj[key] = obj[key];
  });
  let str = '';
  for (const k in newObj) {
    str += '&' + k + '=' + newObj[k];
  }
  str = str.substring(1);
  return str;
}

// 生成signature签名等数据信息的方法
async function sign(url, appId, appSecret) {
  const access_token = await getAccess_token(appId, appSecret);
  const jsapi_ticket = await getJsapi_ticket(access_token);
  const obj = {
    jsapi_ticket,
    noncestr: createNonceStr(),
    timestamp: createTimestamp(),
    url,
  };
  const str = splice(obj);

  // 使用 crypto 模块创建一个 sha1 加密算法的 hash 对象
  const hash = crypto.createHash('sha1');
  // 使用拼接好的字符串更新 hash 对象
  hash.update(str);
  // 计算最终的 hash 值，并转换为十六进制字符串
  const hashcode = hash.digest('hex');

  const signature = hashcode;
  const newObj = {
    appId,
    jsapi_ticket: obj.jsapi_ticket,
    nonceStr: obj.noncestr,
    timestamp: obj.timestamp,
    url,
    signature: signature,
  };
  console.log('obj--------:', newObj);
  return newObj;
}

export default sign;
