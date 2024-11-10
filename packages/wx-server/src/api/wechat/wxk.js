/**
 * 微信公众号服务器主地址，能够正确响应微信发送的token验证
 */

// 导入 Node.js 内置的加密模块 'crypto'
import * as crypto from 'crypto';

// 导出一个异步函数，作为 Koa 路由的处理函数，验证服务器配置
export default async function wxk(ctx) {
  // 从 Koa 的上下文中获取查询参数对象
  const query = ctx.query;

  // 定义公众平台的 token，这个 token 应该和你在微信公众平台基本配置中的 token 一致
  const token = 'id0wxk9english';

  console.log('----------------');
  console.log('token', token);
  console.log('----------------');
  console.log(query);
  console.log('----------------');

  // 判断查询参数中是否缺少 signature, timestamp, nonce, 或 echostr，如果缺少任意一个参数，返回一个默认的文本响应
  if (!query.signature || !query.timestamp || !query.nonce || !query.echostr) {
    // 响应内容：简单的文本提示，表明这是 handle view 的响应
    ctx.body = 'hello, this is handle view';
    // 终止函数执行
    return;
  }

  // 提取请求中的 signature（微信加密签名）, timestamp（时间戳）, nonce（随机数）, echostr（随机字符串）
  const signature = query.signature;
  const timestamp = query.timestamp;
  const nonce = query.nonce;
  const echostr = query.echostr;

  // 使用 crypto 模块创建一个 sha1 加密算法的 hash 对象
  const hash = crypto.createHash('sha1');

  // 将 token, timestamp 和 nonce 组成一个数组，并按字典序排序
  const arr = [token, timestamp, nonce].sort();

  // 将排序后的数组拼接成一个字符串
  const str = arr.join('');

  // 使用拼接好的字符串更新 hash 对象
  hash.update(str);

  // 计算最终的 hash 值，并转换为十六进制字符串
  const hashcode = hash.digest('hex');

  // 输出 hashcode 和微信发送的 signature 以供调试，检查两者是否一致
  console.log('handle/GET func: hashcode, signature: ', hashcode, signature);

  // 比较生成的 hashcode 和请求中的 signature，如果相等，返回 echostr，表示验证成功
  if (hashcode === signature) {
    // 返回 echostr 给微信服务器，表示验证通过
    ctx.body = echostr;
  } else {
    // 如果不匹配，返回空字符串，表示验证失败
    ctx.body = '';
  }
}
