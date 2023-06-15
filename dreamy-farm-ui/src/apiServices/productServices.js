import * as request from '~/utils/request';
import i18next from 'i18next';
import { toast } from 'react-toastify';
import { apis } from '~/configs';

const t = i18next.t.bind(i18next);

export const getProduct = async (slug) => {
  try {
    const res = await request.get(apis.products.detail(slug));
    return res.data;
  } catch (error) {
    if (error?.response?.status === 404) {
      return null;
    }
    toast.error(t('Something went wrong'));
    console.log(error);
  }
};

export const getProductsAtCategory = async (category) => {
  try {
    const res = await request.get(apis.products.category(category));
    return res.data;
  } catch (error) {
    if (error?.response?.status === 404) {
      return null;
    }
    toast.error(t('Something went wrong'));
    console.log(error);
  }
};
