import type { NextApiRequest, NextApiResponse } from "next";
import passport from "passport";
import nextConnect from "next-connect";
import type { IAccount } from "../../shared/models/Account";
import { localStrategy } from "../../lib/passport-local";
import { setLoginSession } from "../../lib/auth";

const authenticate = (
  method: string,
  req: NextApiRequest,
  res: NextApiResponse
) =>
  new Promise<IAccount>((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, account) => {
      if (error) {
        reject(error);
      } else {
        resolve(account);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect<NextApiRequest, NextApiResponse>()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate("local", req, res);
      const session = { ...user };
      await setLoginSession(res, session);
      res.status(200).send({ done: true });
    } catch (error: any) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
