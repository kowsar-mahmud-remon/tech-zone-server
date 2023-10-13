import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { hashedPassword } from '../../../shared/hashPassword';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser) => {
  const { email, password } = user;

  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const hashPass = await hashedPassword(password);

  const newUser = {
    ...user,
    password: hashPass,
  };

  const createUser = await User.create(newUser);

  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }

  return createUser;
};

const getAllUsers = async () => {
  const user = await User.find({});
  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
};
