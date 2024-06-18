import { orderModel } from '../oder.model';
import { Torder } from './order.interface';

const createOrderIntoDB = async (newOrder: Torder) => {
  const result = await orderModel.create(newOrder);
  return result;
};

const getAllOrderFromDB = async () => {
  const result = await orderModel.find();
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
