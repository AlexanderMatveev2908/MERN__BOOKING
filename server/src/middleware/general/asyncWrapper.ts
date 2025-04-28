import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncWrapper =
  (cb: RequestHandler): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await cb(req, res, next);
    } catch (err: any) {
      next(err);
    }
  };

export default asyncWrapper;
