import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { hashedPassword } from '../../../shared/hashPassword';
import { User } from '../user/user.model';
import { IAdmin } from './admin.interface';

const createAdmin = async (admin: IAdmin) => {
  const { email, password } = admin;

  const existingAdmin = await User.findOne({ email: email });

  if (existingAdmin) {
    throw new ApiError(400, 'Admin already exists');
  }

  const hashPass = await hashedPassword(password);

  const newAdmin = {
    ...admin,
    password: hashPass,
  };

  const createAdmin = await User.create(newAdmin);

  if (!createAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
  }

  return createAdmin;
};

const getAllAdmins = async () => {
  const admin = await User.find({ role: 'admin' });
  return admin;
};

const getSingleAdmin = async (id: string) => {
  const result = await User.findOne({ _id: id });
  return result;
};

const updateAdmin = async (id: string, payload: Partial<IAdmin>) => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteAdmin = async (id: string) => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const deletedAdmin = await User.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  );

  return deletedAdmin;
};

export const AdminService = {
  createAdmin,
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
