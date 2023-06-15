import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import i18next from 'i18next';
import { checkoutConfigs } from '~/configs/pages';

const getUid = (id, type) => `${id}-${type.name}`;

export const counterSlice = createSlice({
  name: 'order',
  initialState: {
    products: {},
    // products: {
    // uid is unique key for product and uid === '{id}-{type.name}'
    //  uid: {
    //    id: 1, //required
    //    status: 'ready', // 'ready' or 'busy' name: '', //required count: 1, //required default 1
    //    type:{
    //      name: '' //required
    //      price: 0 //required
    //    },
    //    image: "", //optional
    //  }

    // totalPrice of all products in cart
    totalPrice: 0,

    // total product count in cart (regardless of type)
    count: 0,

    address: {
      address: '',
      phoneNumber: '',
    },

    paymentMethod: checkoutConfigs.payments[0].method, //cash or credit card

    // if true, can move to checkout page
    // true if products.length > 0 and all products.status === 'ready'
    // status: 'ready'  or 'busy'
    canMoveToCheckout: false,

    // errors to validate before create order
    errors: [],
  },

  reducers: {
    clearOrder: (state) => {
      state.products = {};
      state.totalPrice = 0;
      state.count = 0;
      state.address = {
        address: '',
        phoneNumber: '',
      };
      state.paymentMethod = checkoutConfigs.payments[0].method;
      state.canMoveToCheckout = false;
      state.errors = [];
    },
    // when add product to cart
    addProduct: (state, action) => {
      const { id, name, image, type, count } = action.payload;

      const uid = getUid(id, type);

      const countProvied = count || 1;
      const currentCount = state.products[uid]?.count || 0;

      state.products[uid] = {
        id,
        status: 'ready',
        name,
        image,
        type,
        count: currentCount + countProvied,
      };
      state.count += countProvied;

      toast.success(i18next.t('Add to shopping cart successfully'));
    },

    // when remove product from cart
    removeProduct: (state, action) => {
      const { id, type } = action.payload;
      const uid = getUid(id, type);

      state.count -= state.products[uid].count;
      delete state.products[uid];
    },

    calcTotalPrice: (state) => {
      let totalPrice = 0;
      Object.keys(state.products).forEach((uid) => {
        const product = state.products[uid];
        totalPrice += product.type.price * product.count;
      });
      state.totalPrice = totalPrice;
    },

    changeProductCount: (state, action) => {
      const { id, type, count } = action.payload;
      const uid = getUid(id, type);
      state.count -= state.products[uid].count;

      state.products[uid].count = count;
      state.count += count;
    },

    unitIncreaseProductCount: (state, action) => {
      const { id, type } = action.payload;
      const uid = getUid(id, type);
      state.products[uid].count += 1;
      state.count += 1;
    },

    unitDecreaseProductCount: (state, action) => {
      const { id, type } = action.payload;
      const uid = getUid(id, type);
      state.products[uid].count -= 1;

      if (state.products[uid].count === 0) {
        delete state.products[uid];
      }

      state.count -= 1;
    },

    setAddress: (state, action) => {
      state.address = action.payload;
    },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const addAndCalcPrice = (product) => (dispatch) => {
  const { id, name, image, type, count } = product;
  dispatch(
    counterSlice.actions.addProduct({
      id,
      name,
      image,
      type,
      count,
    }),
  );

  dispatch(counterSlice.actions.calcTotalPrice());
};

export const removeAndCalcPrice = (product) => (dispatch) => {
  const { id, type } = product;
  dispatch(counterSlice.actions.removeProduct({ id, type }));
  dispatch(counterSlice.actions.calcTotalPrice());
};

export const changeProductCountAndCalcPrice =
  (product, count) => (dispatch) => {
    const { id, type } = product;
    dispatch(counterSlice.actions.changeProductCount({ id, type, count }));
    dispatch(counterSlice.actions.calcTotalPrice());
  };

export const unitIncreaseProductAndCalcPrice =
  ({ id, type }) =>
  (dispatch) => {
    dispatch(counterSlice.actions.unitIncreaseProductCount({ id, type }));
    dispatch(counterSlice.actions.calcTotalPrice());
  };

export const unitDecreaseProductAndCalcPrice =
  ({ id, type }) =>
  (dispatch) => {
    dispatch(counterSlice.actions.unitDecreaseProductCount({ id, type }));
    dispatch(counterSlice.actions.calcTotalPrice());
  };

export const {
  calcTotalPrice,
  addProduct,
  removeProduct,
  changeProductCount,
  unitDecreaseProductCount,
  unitIncreaseProductCount,

  setAddress,
  setPaymentMethod,
  clearOrder,
} = counterSlice.actions;
export default counterSlice.reducer;
