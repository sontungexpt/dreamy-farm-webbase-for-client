import * as request from '~/utils/request';
import { apis } from '~/configs';

export const search = async ({ keySearch, page, limit }) => {
  const res = await request.get(apis.products.search, {
    keySearch,
    page,
    limit,
  });
  return res.data;
};
