import { Request, Response } from 'express';
import { productServices } from './product..service';
import productValidationSchema from './product..validation';
import { fromError } from 'zod-validation-error';
import { ZodError } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
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
          errors: finalError.message, // Include detailed validation errors
        });
      } else {
        throw validationError; // Propagate unexpected validation errors
      }
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
};
