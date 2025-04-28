import { NextFunction, Request, Response } from "express";

const errMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  console.log(err);
  return res.status(500).json({
    msg: "Internal error, don't worry we are working on it 🔨🔨🔨",
    success: false,
    stack: err.stack,
  });
};

export default errMiddleware;
