import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import { generateToken } from '../../../shared/generateToken';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;
    const result = await UserService.createUser(user);

    const token = generateToken({
      email: result?.email,
      role: result?.role,
    });

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully!',
      data: result,
      token: token,
    });
  }
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const allUSers = await UserService.getAllUsers();

  if (!allUSers) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully !',
    data: allUSers,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
};
