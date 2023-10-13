import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IService } from './service.interface';
import { Service } from './service.model';

const createService = async (service: IService) => {
  const createService = await Service.create(service);

  if (!createService) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Service');
  }

  return createService;
};

const getAllServices = async () => {
  const service = await Service.find({});
  return service;
};

const getSingleService = async (id: string) => {
  const result = await Service.findOne({ _id: id });
  return result;
};

const updateService = async (id: string, payload: Partial<IService>) => {
  const isExist = await Service.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found !');
  }

  const result = await Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteService = async (id: string) => {
  const isExist = await Service.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found !');
  }

  //delete student first
  const deletedService = await Service.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );

  return deletedService;
};

export const ServiceService = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
