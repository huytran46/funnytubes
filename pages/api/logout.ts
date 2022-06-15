import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(
  req: NextApiRequest,
  res: NextApiResponse<{ isLoggedIn: boolean }>
) {
  req.session.destroy();
  res.json({ isLoggedIn: false });
}
