import { Request, Response } from 'express';
import { productServices } from './product..service';
import productValidationSchema from './product..validation';
import { fromError } from 'zod-validation-error';
import { ZodError } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    // zod error handleing using try-catch
    try {
      const zodParsedData = productValidationSchema.parse(product);
      const result = await productServices.createProductIntoDB(zodParsedData);

      res.status(200).json({
        success: true,
        message: 'Product data created successfully',
        data: result,
      });
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        const finalError = fromError(validationError);

        res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: finalError.message,
        });
      } else {
        throw validationError;
      }
    }
  } catch (err) {
    //for error type, instanceof using for error type identified
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

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductFromDB();
    if (result.length !== 0) {
      return res.status(200).json({
        success: true,
        message: 'Products data are found successfully',
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Data fetching successful but there is no product data!',
      });
    }
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
  getAllProducts,
};
