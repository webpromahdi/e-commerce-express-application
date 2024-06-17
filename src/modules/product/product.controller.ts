import { Request, Response } from 'express';
import { productServices } from './product..service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const result = await productServices.createProductIntoDB(product);

    res.status(200).json({
      success: true,
      message: 'Product data created successfully',
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An unknown error occurred',
      });
    }
  }
};

export const productControllers = {
  createProduct,
};
