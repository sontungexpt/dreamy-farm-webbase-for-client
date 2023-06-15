import * as request from '~/utils/request';
import { apis } from '~/configs';
import encryptPassword from '~/utils/encryptPassword';

export const getToken = async ({ email, password }) => {
  const encryptedPassword = encryptPassword(password);

  const res = await request.post(apis.users.login, {
    email,
    password: encryptedPassword,
  });
  const { data } = res;
  return data;
};

export const getUserInfos = async (token) => {
  const res = await request.post(apis.users.userInfos, { token });
  const { data } = res;
  return data;
};

export const registerUser = async ({ name, email, password }) => {
  const encryptedPassword = encryptPassword(password);

  const res = await request.post(apis.users.register, {
    name,
    email,
    password: encryptedPassword,
    method: 'register',
  });
  const { status } = res;

  return status;
};

export const updateUserFavoriteProducts = async (email, productId, method) => {
  const res = await request.put(apis.users.updateUserFavoriteProducts, {
    email,
    productId,
    method,
  });
  const { data } = res;
  return data;
};

export const getUserFavoriteProducts = async (email) => {
  const res = await request.post(apis.users.getUserFavoriteProducts, {
    email,
  });
  const { data } = res;
  return data;
};

export const addFeedback = async ({ email, content }) => {
  const res = await request.post(apis.users.feedback, {
    email,
    content,
  });
  const { data } = res;
  return data;
};

export const updateUserProfile = async ({ email, name, sex }) => {
  const res = await request.put(apis.users.updateProfile, {
    email,
    name,
    sex,
  });
  const { data } = res;
  return data;
};

export const addAddress = async ({ address, email, phoneNumber }) => {
  const res = await request.put(apis.users.addAddress, {
    email,
    address,
    phoneNumber,
  });
  const { data } = res;
  return data;
};

export const updateAddress = async ({
  newAddress,
  email,
  newPhoneNumber,
  oldAddress,
  oldPhoneNumber,
  newActive,
}) => {
  const res = await request.put(apis.users.updateAddress, {
    email,
    oldPhoneNumber,
    oldAddress,
    newPhoneNumber,
    newAddress,
    newActive,
  });

  const { data } = res;
  return data;
};

export const deleteAddress = async ({ email, address, phoneNumber }) => {
  const res = await request.put(apis.users.deleteAddress, {
    email,
    address,
    phoneNumber,
  });

  const { data } = res;
  return data;
};

export const getOrders = async (email) => {
  const res = await request.get(apis.orders.getOrders, {
    email,
  });

  const { data } = res;
  return data;
};

export const createOrder = async ({
  email,
  address,
  phoneNumber,
  products, // just post productId
  paymentMethod,
  price,
}) => {
  const res = await request.post(apis.orders.createOrder, {
    email,
    address,
    phoneNumber,
    products,
    paymentMethod,
    price,
  });

  const { data } = res;
  return data;
};
