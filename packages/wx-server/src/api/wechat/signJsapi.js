import { sign } from '../../utils/wechat/sign';

export default async function signJsapi(ctx) {
  const url = decodeURIComponent(ctx.request.url); // 当前发送请求的URL,URL不要#后面的内容
  // const url = ctx.request.url;
  console.log('url', url);
  const conf = await sign(
    url,
    process.env.EPS_GZH_APP_ID,
    process.env.EPS_GZH_APP_SECRET
  );
  console.log('conf', conf);
  ctx.body = conf;
}
