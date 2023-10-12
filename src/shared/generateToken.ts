import jwt from 'jsonwebtoken';
import { IUserAccessTokenData } from '../interfaces/common';

export const generateToken = (
  data: IUserAccessTokenData,
  expiresIn = '180d'
) => {
  const token = jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn });
  return token;
};
