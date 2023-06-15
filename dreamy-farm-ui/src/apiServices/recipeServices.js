import * as request from '~/utils/request';
import { apis } from '~/configs';

export const getRecipes = async (method) => {
  const res = await request.get(apis.recipes.getRecipes, { method });
  return res.data;
};

export const getRecipe = async (slug) => {
  const res = await request.get(apis.recipes.detail(slug));
  return res.data;
};
