import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getToken,
  getUserInfos,
  registerUser,
  updateUserFavoriteProducts,
  getUserFavoriteProducts,
  updateUserProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  createOrder,
} from '~/apiServices/userServices';

import { routes as routesConfig } from '~/configs';
import history from '~/utils/navigateSite';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    status: 'idle',

    //user info
    email: '',
    name: '',
    avatar: '',
    addreses: [],
    // addreses: {
    //    address: '',
    //    phoneNumber: '',
    //    active: false,
    // }
    sex: '',
    roles: [], // ['admin', 'user', 'moderator']

    wishList: [], //array of favorite products
  },
  reducers: {
    logout: (state) => {
      state.status = 'idle';
      state.loggedIn = false;
      state.name = '';
      state.email = '';
      state.avatar = '';
      state.addreses = [];
      state.sex = '';
      state.roles = [];
      state.wishList = [];

      window.localStorage.removeItem('DreamyFarmToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        // wrong email or password
        if (!action.payload.wishList || !action.payload.userInfos) {
          state.status = 'idle';
          return;
        }
        // login success
        // assing user info to state
        Object.assign(state, action.payload.userInfos);

        // assign wishList
        state.wishList = action.payload.wishList;

        // set loggedIn to true
        state.loggedIn = true;

        // set status to idle
        state.status = 'idle';
        history.navigate(routesConfig.root, { replace: true });
      })
      .addCase(login.rejected, (state) => {
        state.status = 'idle';
      })
      .addCase(register.fulfilled, (_, action) => {
        if (action.payload === 'success') {
          history.navigate(routesConfig.login, { replace: true });
        }
      })
      .addCase(updateWishList.fulfilled, (state, action) => {
        state.wishList = action.payload;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.wishList = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        if (action.payload) state.addreses = action.payload;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        if (action.payload) state.addreses = action.payload;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        if (action.payload) state.addreses = action.payload;
      })
      .addCase(createUserOrder.fulfilled, (state, action) => {
        return;
      });
  },
});

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const token = await getToken({ email, password });
    if (token) {
      // set token to local storage
      window.localStorage.setItem('DreamyFarmToken', token);
      window.localStorage.setItem('DreamyFarmLogin', true);

      // get user infos
      const userInfos = await getUserInfos(token);
      const wishList = await getUserFavoriteProducts(email);
      return { userInfos, wishList };
    }
  },
);

export const updateWishList = createAsyncThunk(
  'user/updateWishList',
  async ({ email, productId, method }) => {
    const wishList = await updateUserFavoriteProducts(email, productId, method);

    return wishList || [];
  },
);

export const getWishList = createAsyncThunk(
  'user/getWishList',
  async (email) => {
    const wishList = await getUserFavoriteProducts(email);

    return wishList || [];
  },
);

export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }) => {
    const status = await registerUser({ name, email, password });
    return status;
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({ email, name, sex }) => {
    const newUserInfo = await updateUserProfile({ email, name, sex });
    return newUserInfo;
  },
);

export const addUserAddress = createAsyncThunk(
  'user/addUserAddress',
  async ({ email, address, phoneNumber }) => {
    const newAddreses = await addAddress({ email, address, phoneNumber });
    return newAddreses;
  },
);

export const updateUserAddress = createAsyncThunk(
  'user/updateUserAddress',
  async ({
    oldAddress,
    oldPhoneNumber,
    email,
    newPhoneNumber,
    newAddress,
    newActive,
  }) => {
    const newAddreses = await updateAddress({
      oldAddress,
      oldPhoneNumber,
      email,
      newAddress,
      newPhoneNumber,
      newActive,
    });
    return newAddreses;
  },
);

export const deleteUserAddress = createAsyncThunk(
  'user/deleteUserAddress',
  async ({ email, address, phoneNumber }) => {
    const newAddreses = await deleteAddress({ email, address, phoneNumber });
    return newAddreses;
  },
);

export const createUserOrder = createAsyncThunk(
  'user/createUserOrder',
  // temp solution is embed products into order
  async ({ email, address, phoneNumber, products, paymentMethod, price }) => {
    await createOrder({
      email,
      address,
      phoneNumber,
      products,
      paymentMethod,
      price,
    });
  },
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
