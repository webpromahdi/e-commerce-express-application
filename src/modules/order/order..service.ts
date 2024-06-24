import { orderModel } from '../oder.model';
import { ProductModel } from '../product..model';
import { Torder } from './order.interface';

const createOrderIntoDB = async (newOrder: Torder) => {
  //most important to apply inventory management logic
  // finding the product to check inventory
  const product = await ProductModel.findById(newOrder.productId);
  if (!product) {
    throw new Error('Product not found');
  }
  if (product.inventory.quantity < newOrder.quantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  // Creating the order
  const result = await orderModel.create(newOrder);

  // Last Update the inventory
  product.inventory.quantity -= newOrder.quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  return result;
};

const getAllOrderFromDB = async () => {
  const result = await orderModel.find();
  return result;
};

const getOrdersByEmailFromDB = async (email: string) => {
  const result = await orderModel.find({ email });
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrdersByEmailFromDB,
};
