import 'weui';
import { Button } from 'react-weui';
import 'react-weui/build/packages/react-weui.css';
import wx from 'weixin-js-sdk';

function scanCode() {
  wx.scanQRCode({
    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
    success: (res) => {
      let result = res.result; // 当needResult 为 1 时，扫码返回的结果
      console.log(result);
    },
  });
}
export function App() {
  return <Button onClick={scanCode}>Hello wechat</Button>;
}

export default App;
