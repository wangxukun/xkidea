import axios from 'axios';
import wx from 'weixin-js-sdk';

async function wxconfig() {
  // 当前发起请求的URL
  let url = encodeURIComponent(window.location.href.split('#')[0]);
  await axios
    .get(`https://www.wxkzd.com/api/wechat/jsapi?url=${url}`)
    .then((result) => {
      console.log('jsapi接口下发的数据', result.data);
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        ...result.data,
        // appId: '', // 必填，公众号的唯一标识
        // timestamp: '', // 必填，生成签名的时间戳
        // nonceStr: '', // 必填，生成签名的随机串
        // signature: '', // 必填，签名
        jsApiList: ['scanQRCode'], // 必填，需要使用的JS接口列表
      });
    });
}

export default wxconfig;
