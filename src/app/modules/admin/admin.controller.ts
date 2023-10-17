import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import { generateToken } from '../../../shared/generateToken';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';
import { AdminService } from './admin.service';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const admin = req.body;
    const result = await AdminService.createAdmin(admin);

    const token = generateToken({
      _id: result?._id,
      email: result?.email,
      role: result?.role,
    });

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
      token: token,
    });
  }
);

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const allAdmins = await AdminService.getAllAdmins();

  if (!allAdmins) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Admins');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins fetched successfully !',
    data: allAdmins,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const singleAdmin = await AdminService.getSingleAdmin(id);

  if (!singleAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Admin');
  }

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully !',
    data: singleAdmin,
  });
});

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedAdmin = await AdminService.updateAdmin(id, updatedData);

  if (!updatedAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Admin');
  }

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully !',
    data: updatedAdmin,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedAdmin = await AdminService.deleteAdmin(id);

  if (!deletedAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
  }

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully !',
    data: deletedAdmin,
  });
});

export const AdminController = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
