import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import dbConnect from "../../../lib/mongodb";

async function database(req: NextApiRequest, res: NextApiResponse, next: any) {
  try {
    await dbConnect();
    return next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "cannot connect to mongodb", error: error });
  }
}

const dbMiddleware = nextConnect();

dbMiddleware.use(database);

export default dbMiddleware;
