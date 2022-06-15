import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import { IAccount } from "../../shared/models/Account";
import AccountSchema from "../../shared/schema/Account.schema";
import dbMiddleware from "./middleware/db";
import { hashPassword } from "../../lib/password";

const handler = nextConnect();

handler.use(dbMiddleware);

async function loginController(req: NextApiRequest, res: NextApiResponse) {
  const {
    email,
    password,
    confirm,
  }: { email: string; password: string; confirm: string } = await req.body;
  try {
    if (confirm !== password) {
      res.status(400).json({ message: "confirm and password are not matched" });
      return;
    }

    const existAccount = await AccountSchema.findOne({ email });

    if (existAccount) {
      res.status(409).json({ message: "email is already existed" });
      return;
    }

    const hash = await hashPassword(password);

    const data = await AccountSchema.create({ email, password: hash });

    //
    const user: Partial<IAccount> = { email: data.email, _id: data._id };

    req.session.user = user;

    await req.session.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message, error });
  }
}

export default withIronSessionApiRoute(
  handler.post(loginController),
  sessionOptions
);
