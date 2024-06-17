import { ProductModel } from '../product..model';
import { Tproduct } from './product.interface';

const createProductIntoDB = async (productData: Tproduct) => {
  const existingProduct = await ProductModel.findOne({
    name: productData.name,
  });
  if (existingProduct) {
    throw new Error('Product already exists');
  }
  const result = await ProductModel.create(productData);
  return result;
};

export const productServices = {
  createProductIntoDB,
};
