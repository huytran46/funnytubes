import Local from "passport-local";
import mongoConnect from "./mongodb";
import AccountSchema from "../shared/schema/Account.schema";

export const localStrategy = new Local.Strategy(async function (
  email,
  password,
  done
) {
  try {
    await mongoConnect();
    const account = await AccountSchema.findOne({ email });
    if (account && account.password === password) {
      done(null, account);
    }
  } catch (error) {
    done(error);
  }
});
