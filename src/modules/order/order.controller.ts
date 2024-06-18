import { Request, Response } from 'express';
import { orderServices } from './order..service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const result = await orderServices.createOrderIntoDB(order);
    res.status(200).json({
      success: true,
      message: 'Order successfully',
      data: result,
    });
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

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrderFromDB();
    if (result.length !== 0) {
      return res.status(200).json({
        success: true,
        message: 'Orders are found successfully',
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Orders fetching successful but there is no orders!',
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

export const orderControllers = {
  createOrder,
  getAllOrders,
};
