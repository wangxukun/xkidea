/**
 * 微信公众号鉴权接口
 */

import axios from 'axios';
import * as crypto from 'crypto';
const accessTokenModel = require('../../db/models/AccessTokenModel');
const jsapiTicketModel = require('../../db/models/JsapiTicketModel');
// https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

async function getAccess_token(appId, appSecret) {
  let access_token = '';
  const access_token_data = await accessTokenModel.find();
  if (access_token_data.length > 0) {
    // Check if the access_token already exists in the db.
    const t = new Date().getTime() - access_token_data[0].token_time;
    if (t > 7000000) {
      // Expires if greater than 7000 seconds.
      // Reacquire the access_token
      await loadData();
      // update AccessTokenModel
      let { _id } = access_token_data[0];
      await accessTokenModel.update(
        { _id },
        {
          access_token,
          token_time: new Date().getTime(),
        }
      );
    } else {
      access_token = access_token_data[0].access_token;
    }
  } else {
    // Reacquire the access_token
    await loadData();
    // create AccessTokenModel
    await new accessTokenModel({
      access_token,
      token_time: new Date().getTime(),
    }).save();
  }

  /**
   * Obtain the access_token from the WeChat server.
   * @returns {Promise<void>}
   */
  async function loadData() {
    const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
    const token_data = await axios.get(tokenUrl);
    access_token = token_data.data.access_token;
  }

  return access_token;
}

async function getJsapi_ticket(access_token) {
  let jsapi_ticket = '';
  const jsapi_ticket_data = await jsapiTicketModel.find();
  if (jsapi_ticket_data.length > 0) {
    // Check if the jsapi_ticket already exists in the db.
    const t = new Date().getTime() - jsapi_ticket_data[0].ticket_time;
    if (t > 7000000) {
      // Reacquire the jsapi_ticket
      await loadData();
      // update JsapiTicketModel
      let { _id } = jsapi_ticket_data[0];
      await jsapiTicketModel.update(
        { _id },
        {
          jsapi_ticket,
          ticket_time: new Date().getTime(),
        }
      );
    } else {
      jsapi_ticket = jsapi_ticket_data[0].jsapi_ticket;
    }
  } else {
    // Reacquire the jsapi_ticket
    await loadData();
    // create jsapiTicketModel
    await new jsapiTicketModel({
      jsapi_ticket,
      ticket_time: new Date().getTime(),
    }).save();
  }
  async function loadData() {
    const tickeUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    const ticket_data = await axios(tickeUrl);
    jsapi_ticket = ticket_data.data.ticket;
  }

  return jsapi_ticket;
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
  const signature = hash.digest('hex');

  return {
    appId,
    jsapi_ticket: obj.jsapi_ticket,
    nonceStr: obj.noncestr,
    timestamp: obj.timestamp,
    url,
    signature: signature,
  };
}

export default sign;
