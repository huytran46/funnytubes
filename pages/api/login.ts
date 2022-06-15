import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import { IAccount } from "../../shared/models/Account";
import AccountSchema from "../../shared/schema/Account.schema";
import dbMiddleware from "./middleware/db";

const handler = nextConnect();

handler.use(dbMiddleware);

async function loginController(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: { email: string; password: string } =
    await req.body;
  try {
    const data = await AccountSchema.findOne({ email });
    if (data) {
      // validate password
      if (data.password !== password) {
        res.status(403).json({ message: "invalid password" });
        return;
      }
      //

      const user: Partial<IAccount> = { email: data.email };

      req.session.user = user;

      await req.session.save();

      res.json(user);
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export default withIronSessionApiRoute(
  handler.post(loginController),
  sessionOptions
);
