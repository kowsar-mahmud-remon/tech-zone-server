import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IService } from './service.interface';
import { ServiceService } from './service.service';

const createService = catchAsync(async (req: Request, res: Response) => {
  const service = req.body;

  const result = await ServiceService.createService(service);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service created successfully!',
    data: result,
  });
});

const getAllService = catchAsync(async (req: Request, res: Response) => {
  const allServices = await ServiceService.getAllServices();

  if (!allServices) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Services');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully !',
    data: allServices,
  });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const singleService = await ServiceService.getSingleService(id);

  if (!singleService) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Service');
  }

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully !',
    data: singleService,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedService = await ServiceService.updateService(id, updatedData);

  if (!updatedService) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Service');
  }

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully !',
    data: updatedService,
  });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedService = await ServiceService.deleteService(id);

  if (!deletedService) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Service');
  }

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully !',
    data: deletedService,
  });
});

export const ServiceController = {
  createService,
  getAllService,
  getSingleService,
  updateService,
  deleteService,
};
