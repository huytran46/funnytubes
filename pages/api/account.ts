import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import { IAccount } from "../../shared/models/Account";

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(
  req: NextApiRequest,
  res: NextApiResponse<Partial<IAccount> & { isLoggedIn: boolean }>
) {
  // stateless check
  if (req.session.user) {
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
}
