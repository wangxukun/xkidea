const axios = require('axios');
import { getAccess_token } from './sign';

class Material {
  constructor() {}

  /**
   * Get the material list.
   * @param options
   * @returns {Promise<axios.AxiosResponse<any>>}
   */
  async getMaterialList(options) {
    const { type, offset, count } = options;

    const access_token = await getAccess_token(
      options.appId,
      options.appSecret
    );
    const materialUrl = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${access_token}`;
    return axios.post(materialUrl, { type, offset, count });
  }

  /**
   * Find the media_id by name.
   * @param materialList
   * @param name
   * @param range array
   * @returns {*}
   */
  findMediaIdByName(materialList, name, range) {
    // 检查 data 和 data.item 是否存在且为数组
    if (!materialList || !Array.isArray(materialList.item)) {
      return null;
    }
    console.log('materialList', materialList);
    // 检查 name 是否存在于 range 数组中
    if (!range.includes(name)) return null;
    // 遍历 materialList.item，找到与 name 相等的项
    const item = materialList.item.find((item) => item.name === name);
    // 返回 media_id
    return item ? item.media_id : null;
  }
}

module.exports = {
  Material,
};
