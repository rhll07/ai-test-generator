import * as authService from '../services/authService.js';
import { successResponse } from '../utils/apiResponse.js';

export const signup = async (req, res) => {
  const data = await authService.signup(req.body);
  return successResponse(res, data, 'Account created', 201);
};

export const login = async (req, res) => {
  const data = await authService.login(req.body);
  return successResponse(res, data, 'Logged in');
};

export const me = async (req, res) => {
  return successResponse(res, { user: req.user }, 'Authenticated user');
};

export const logout = async (req, res) => {
  return successResponse(res, null, 'Logged out');
};
