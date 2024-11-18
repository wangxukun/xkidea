const axios = require('axios');
import { getAccess_token } from './sign';

class Material {
  constructor() {}

  async getMaterialList(options) {
    const { type, offset, count } = options;

    const access_token = await getAccess_token(
      options.appId,
      options.appSecret
    );
    const materialUrl = `https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=${access_token}`;
    return axios.post(materialUrl, { type, offset, count });
  }
}

module.exports = {
  Material,
};
