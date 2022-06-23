import { Request, Response } from "express";
export class KidController {
  static add = async (req: Request, res: Response) => {
    try {
      return res.status(201).json({ status: 201, data: 'result' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
