import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { generateToken } from '../../../shared/generateToken';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;
    const result = await UserService.createUser(user);

    const token = generateToken({
      email: result?.email,
      _id: result?._id,
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

export const UserController = {
  createUser,
};
