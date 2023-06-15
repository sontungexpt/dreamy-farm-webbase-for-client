const routes = {
  // headers pages
  root: '/',
  products: '/products',
  productDetail: '/products/detail/:slug',
  moveProductDetail: (slug) => `/products/detail/${slug}`,
  recipes: '/recipes',
  recipeDetail: '/recipes/detail/:slug',
  moveRecipeDetail: (slug) => `/recipes/detail/${slug}`,
  aboutUs: '/aboutUs',
  shoppingCart: '/shoppingCart',
  checkout: '/checkout',
  orderConfirm: '/orderConfirm',

  // accounts pages
  login: '/accounts/',
  register: '/accounts/register',
  forgotPassword: '/accounts/forgotPassword',

  // error pages
  e404: '/e404',

  // settings
  userInfos: {
    root: '/user-infos/accounts',
    orders: '/user-infos/orders',
    address: '/user-infos/address',
    wishlist: '/user-infos/wishlist', //header too
  },
};

export default routes;
