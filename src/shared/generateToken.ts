import jwt from 'jsonwebtoken';
import config from '../config';
import { IUserAccessTokenData } from '../interfaces/common';

export const generateToken = (
  data: IUserAccessTokenData,
  expiresIn = '180d'
) => {
  const token = jwt.sign(data, config.jwt.secret as string, { expiresIn });
  return token;
};
