export default function banners(ctx) {
  const banners = [
    {
      id: 1,
      imageUrl:
        'https://wxkzd.oss-cn-beijing.aliyuncs.com/wx-server/miniprogram/images/banners/banner1.png?Expires=1730216872&OSSAccessKeyId=TMP.3KdjHH3CPVVJW4d5YhXHDQo8oDptvhV8RxE4JkudfLQNrQqS2sDmYr5vwBasHhwnLHMRoE8zPkL5WtqoJjNnU8M7UDrESi&Signature=nCYi6yi2VmU938RqvtJiTJOkTq0%3D',
      title: '每天必用英文-英文200句 English for Daily Use',
    },
    {
      id: 2,
      imageUrl:
        'https://wxkzd.oss-cn-beijing.aliyuncs.com/wx-server/miniprogram/images/banners/banner2.png?Expires=1730216903&OSSAccessKeyId=TMP.3KdjHH3CPVVJW4d5YhXHDQo8oDptvhV8RxE4JkudfLQNrQqS2sDmYr5vwBasHhwnLHMRoE8zPkL5WtqoJjNnU8M7UDrESi&Signature=i7Rx8O%2BYtpOGUpSI0SsgBe%2BnN%2FY%3D',
      title: '初学者必学英语-想说又不会说 Must learn for beginners',
    },
    {
      id: 3,
      imageUrl:
        'https://wxkzd.oss-cn-beijing.aliyuncs.com/wx-server/miniprogram/images/banners/banner3.png?Expires=1730216921&OSSAccessKeyId=TMP.3KdjHH3CPVVJW4d5YhXHDQo8oDptvhV8RxE4JkudfLQNrQqS2sDmYr5vwBasHhwnLHMRoE8zPkL5WtqoJjNnU8M7UDrESi&Signature=gOvBEmYPxSJaoDf2JnT94DtzM1A%3D',
      title: '最全必背购物英文-超市英语 Grocery Shopping',
    },
    {
      id: 4,
      imageUrl:
        'https://wxkzd.oss-cn-beijing.aliyuncs.com/wx-server/miniprogram/images/banners/banner4.png?Expires=1730216940&OSSAccessKeyId=TMP.3KdjHH3CPVVJW4d5YhXHDQo8oDptvhV8RxE4JkudfLQNrQqS2sDmYr5vwBasHhwnLHMRoE8zPkL5WtqoJjNnU8M7UDrESi&Signature=mWqTMxjXOxvEpEGzi%2BlYx27ODOk%3D',
      title: '接打英文电话-不再慌张 Phone Conversation',
    },
    {
      id: 5,
      imageUrl:
        'https://wxkzd.oss-cn-beijing.aliyuncs.com/wx-server/miniprogram/images/banners/banner5.png?Expires=1730217007&OSSAccessKeyId=TMP.3KdjHH3CPVVJW4d5YhXHDQo8oDptvhV8RxE4JkudfLQNrQqS2sDmYr5vwBasHhwnLHMRoE8zPkL5WtqoJjNnU8M7UDrESi&Signature=6%2BFyRTNJA4he0Vc2%2FciZUVWRBgs%3D',
      title: '小吃摊点餐英文-万用短句 Ordering Food',
    },
  ];
  ctx.body = {
    code: 0,
    data: banners,
    message: 'success',
  };
}
