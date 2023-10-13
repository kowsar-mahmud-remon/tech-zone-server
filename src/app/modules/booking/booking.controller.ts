import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBooking } from './booking.interface';
import { BookingService } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = req.body;
  const result = await BookingService.createBooking(booking);

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully!',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const allBookings = await BookingService.getAllBookings();

  if (!allBookings) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Bookings');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully !',
    data: allBookings,
  });
});

const getSingleUserBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const getBooking = await BookingService.getSingleUserBooking(id);

  if (!getBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get Booking');
  }

  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking fetched successfully !',
    data: getBooking,
  });
});

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const updatedBooking = await BookingService.updateBooking(id, updatedData);

  if (!updatedBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to Update Booking');
  }

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully !',
    data: updatedBooking,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedBooking = await BookingService.deleteBooking(id);

  if (!deletedBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to delete Booking');
  }

  sendResponse<IBooking>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking deleted successfully !',
    data: deletedBooking,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleUserBooking,
  updateBooking,
  deleteBooking,
};
