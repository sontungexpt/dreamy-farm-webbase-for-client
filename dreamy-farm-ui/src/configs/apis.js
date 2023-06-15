const apis = {
  products: {
    root: '/products',
    fruit: '/products/fruits',
    vegetables: '/products/vegetables',
    herbs_aromatics: '/products/herbs-aromatics',
    frozens: '/products/frozens',
    meats_seafoods: '/products/meats-seafoods',
    dairy_eggs: '/products/dairy-eggs',
    search: '/search',
    detail: (slug) => `/products/detail/${slug}`,
    category: (category) => `/products/${category}`,
  },
  users: {
    login: '/user/login',
    register: '/user/register',
    forgotPassword: '/user/forgot-password',
    userInfos: '/user/infos',
    updateUserFavoriteProducts: '/user/favoriteProducts/update',
    getUserFavoriteProducts: '/user/favoriteProducts/get',
    feedback: '/user/feedback',
    updateProfile: '/user/updateProfile',
    addAddress: '/user/addAddress',
    updateAddress: '/user/updateAddress',
    deleteAddress: '/user/deleteAddress',
  },
  orders: {
    getOrders: '/order/get',
    createOrder: '/order/create',
  },

  recipes: {
    getRecipes: '/recipes',
    addRecipe: '/recipes/add',
    detail: (slug) => `/recipes/detail/${slug}`,
  },
};

export default apis;
