import type { IAccount } from "./Account";

export type NolayoutPage = {
  noLayout?: boolean;
};

export type PageWithUser = {
  user?: Partial<IAccount> | null;
};

export type PageWithPreloadedData = {
  fallback?: Record<string, any>;
};
