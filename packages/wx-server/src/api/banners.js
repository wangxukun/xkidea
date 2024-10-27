export default function banners(ctx) {
  const banners = [
    {
      id: 1,
      imageUrl: `https://${process.env.EPS_GZH_APP_HOST}/miniprogram/images/banners/banner1.png`,
      title: '每天必用英文-英文200句 English for Daily Use',
    },
    {
      id: 2,
      imageUrl: `https://${process.env.EPS_GZH_APP_HOST}/miniprogram/images/banners/banner2.png`,
      title: '初学者必学英语-想说又不会说 Must learn for beginners',
    },
    {
      id: 3,
      imageUrl: `https://${process.env.EPS_GZH_APP_HOST}/miniprogram/images/banners/banner3.png`,
      title: '最全必背购物英文-超市英语 Grocery Shopping',
    },
    {
      id: 4,
      imageUrl: `https://${process.env.EPS_GZH_APP_HOST}/miniprogram/images/banners/banner4.png`,
      title: '接打英文电话-不再慌张 Phone Conversation',
    },
    {
      id: 5,
      imageUrl: `https://${process.env.EPS_GZH_APP_HOST}/miniprogram/images/banners/banner5.png`,
      title: '小吃摊点餐英文-万用短句 Ordering Food',
    },
  ];
  ctx.body = {
    code: 0,
    data: banners,
    message: 'success',
  };
}
