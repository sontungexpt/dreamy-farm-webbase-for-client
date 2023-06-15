'use strict';
import User from '~/models/User';
import UserInfo from '~/models/UserInfo';
import jwt from 'jsonwebtoken';
import properties from '~/configs';

export const checkToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (token) {
      const user = jwt.verify(token, properties.JWT_SECRET, (err, res) => {
        if (err) {
          return 'token expired';
        }
        return res;
      });
      if (user === 'token expired') {
        return res.json({
          status: 'error',
          message: 'token expired',
          data: 'token expired',
        });
      }
      res.locals._user = user;
    }
    next();
  } catch (error) {
    res.json({ status: 'error', message: error.message, error: error });
  }
};

export const checkUser = async (req, res, next) => {
  try {
    // no token
    if (!res.locals._user) {
      // post put delete
      let email = req.body?.email;

      // get
      if (!email) {
        email = req.query?.email;
      }

      const { method } = req.body;

      if (!email) {
        return res.json({
          status: 'warning',
          message: 'You need to login to use this feature',
          required: 'email',
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        if (method === 'register') {
          return next();
        }
        return res.json({
          status: 'error',
          message: 'User not found',
        });
      }
      if (user.status === 'blocked') {
        return res.json({
          status: 'error',
          message: 'User are no longer authorized to access this account',
        });
      }
      res.locals._user = user;
    }
    next();
  } catch (error) {
    res.json({ status: 'error', message: error.message, error: error });
  }
};

const hasRole = (roles, role) => {
  if (!roles || !role) {
    return false;
  }
  return roles.includes(role);
};

const checkRole = (req, res, next, role) => {
  try {
    const user = res.locals._user;
    if (!hasRole(user?.roles, role)) {
      return res.json({
        status: 'error',
        message: 'You are not authorized to access this account',
      });
    }
    return next();
  } catch (error) {
    return res.json({ status: 'error', message: error.message, error: error });
  }
};

export const checkIsUser = async (req, res, next) => {
  return checkRole(req, res, next, 'user');
};

export const checkIsAdmin = async (req, res, next) => {
  return checkRole(req, res, next, 'admin');
};

export const checkIsModerator = async (req, res, next) => {
  return checkRole(req, res, next, 'moderator');
};

export const checkUserInfo = async (req, res, next) => {
  try {
    const user = res.locals._user;
    const userInfo = await UserInfo.findOne({ email: user.email });

    if (!userInfo) {
      return res.json({
        status: 'error',
        message: 'User infos not found',
        data: 'User infos not found',
      });
    }

    res.locals._userInfo = userInfo;
    next();
  } catch (err) {
    res.json({ status: 'error', message: err.message, error: err });
  }
};
