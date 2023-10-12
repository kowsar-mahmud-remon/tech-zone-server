import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { generateToken } from '../../../shared/generateToken';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginUserData = req.body;

  const result = await AuthService.loginUser(loginUserData);

  const token = generateToken({
    _id: loginUserData?._id,
    email: loginUserData?.email,
    role: loginUserData?.role,
  });

  res.status(200).json({
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
    token: token,
  });
});

export const AuthController = {
  loginUser,
};
