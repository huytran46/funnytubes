// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { IronSessionOptions } from "iron-session";
import type { IAccount } from "../shared/models/Account";

export const sessionOptions: IronSessionOptions = {
  password: process.env.TOKEN_SECRET ?? "",
  cookieName: "funnytubes.remintano.io",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: Partial<IAccount>;
  }
}
