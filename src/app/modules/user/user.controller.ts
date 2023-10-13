import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import { generateToken } from '../../../shared/generateToken';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
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
  const allUsers = await UserService.getAllUsers();

  if (!allUsers) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully !',
    data: allUsers,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const allUser = await UserService.getSingleUser(id);

  if (!allUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully !',
    data: allUser,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
