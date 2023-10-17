import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (booking: IBooking) => {
  const createBooking = await Booking.create(booking);

  if (!createBooking) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Booking');
  }

  return createBooking;
};

const getAllBookings = async () => {
  const booking = await Booking.find({});
  return booking;
};

const getSingleUserBooking = async (id: string) => {
  const result = await Booking.find({ userId: id });

  return result;
};

const updateBooking = async (id: string, payload: Partial<IBooking>) => {
  const isExist = await Booking.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found !');
  }

  const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBooking = async (id: string) => {
  const isExist = await Booking.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found !');
  }

  const deletedBooking = await Booking.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );

  return deletedBooking;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleUserBooking,
  updateBooking,
  deleteBooking,
};
