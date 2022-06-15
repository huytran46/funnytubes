import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import dbMiddleware from "./middleware/db";
import VideoSchema from "../../shared/schema/Video.schema";

const handler = nextConnect();

handler.use(dbMiddleware);

async function videosController(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await VideoSchema.find();
    res.status(200).json(
      data?.map((vid) => ({
        _id: vid._id,
        url: vid.url,
        title: vid.title ?? "",
        description: vid.description ?? "",
        sharerId: vid.sharerId,
      })) ?? []
    );
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default handler.get(videosController);
