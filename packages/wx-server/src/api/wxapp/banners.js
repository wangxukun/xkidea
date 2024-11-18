const OSS = require('ali-oss');

const config = {
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
  region: process.env.OSS_REGION,
  // 从环境变量中获取访问凭证。运行本代码示例之前，请确保已设置环境变量OSS_ACCESS_KEY_ID和OSS_ACCESS_KEY_SECRET。
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  // 填写Bucket名称。
  bucket: 'wxkzd',
};

// OOS对象存储服务器中的文件ID
const objects = [
  'wx-server/miniprogram/images/banners/banner1.png',
  'wx-server/miniprogram/images/banners/banner2.png',
  'wx-server/miniprogram/images/banners/banner3.png',
  'wx-server/miniprogram/images/banners/banner4.png',
  'wx-server/miniprogram/images/banners/banner5.png',
];

let urls = [];
export default function banners(ctx) {
  // 创建OOS客户端
  const client = new OSS(config);
  // 生成文件的签名URL。
  // objectKey = 'wx-server/miniprogram/images/banners/banner1.png'
  for (const i in objects) {
    urls[i] = client.signatureUrl(objects[i], {
      expires: 3600,
    });
  }

  const banners = [
    {
      id: 1,
      imageUrl: urls[0],
      title: '每天必用英文-英文200句 English for Daily Use',
    },
    {
      id: 2,
      imageUrl: urls[1],
      title: '初学者必学英语-想说又不会说 Must learn for beginners',
    },
    {
      id: 3,
      imageUrl: urls[2],
      title: '最全必背购物英文-超市英语 Grocery Shopping',
    },
    {
      id: 4,
      imageUrl: urls[3],
      title: '接打英文电话-不再慌张 Phone Conversation',
    },
    {
      id: 5,
      imageUrl: urls[4],
      title: '小吃摊点餐英文-万用短句 Ordering Food',
    },
  ];
  ctx.body = {
    code: 0,
    message: '获取轮播图数据功能',
    data: banners,
  };
}
