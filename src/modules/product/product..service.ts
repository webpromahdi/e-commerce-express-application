import config from '../../app/config';
import { ProductModel } from '../product..model';
import { Tproduct } from './product.interface';
import { MongoClient, ObjectId } from 'mongodb';

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

const getAllProductFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (_id: string) => {
  let client: MongoClient | null = null;
  try {
    client = await MongoClient.connect(config.database_url as string);
    const db = client.db(config.db_name);
    const result = await db
      .collection('products')
      .findOne({ _id: new ObjectId(_id) });
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } finally {
    if (client) {
      await client.close();
    }
  }
};

const updateSingleProductFromDB = async (
  _id: string,
  updateData: Partial<Tproduct>,
) => {
  let client: MongoClient | null = null;
  try {
    client = await MongoClient.connect(config.database_url as string);
    const db = client.db(config.db_name);
    const result = await db
      .collection('products')
      .findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: updateData },
        { returnDocument: 'after' },
      );
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } finally {
    if (client) {
      await client.close();
    }
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
};
