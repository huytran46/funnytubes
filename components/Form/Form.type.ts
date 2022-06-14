import type { FormEventHandler } from "react";

export interface IFormProps {
  isLogin: boolean;
  errorMessage: string;
  onSubmit: FormEventHandler;
}
