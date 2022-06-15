import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import dbMiddleware from "./middleware/db";
import VideoSchema from "../../shared/schema/Video.schema";

const handler = nextConnect();

handler.use(dbMiddleware);

async function shareController(req: NextApiRequest, res: NextApiResponse) {
  const {
    url,
    title,
    description,
  }: { url: string; title: string; description: string } = await req.body;

  try {
    if (!req.session.user) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }

    const data = await VideoSchema.findOne({
      url,
      sharerId: req.session.user._id,
    });

    if (data) {
      res.status(409).json({ message: "this video is already shared" });
      return;
    }

    const vid = new VideoSchema({
      url,
      title,
      description,
      sharerId: req.session.user._id,
    });

    await vid.save();

    res.status(200).json(vid);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(
  handler.post(shareController),
  sessionOptions
);
