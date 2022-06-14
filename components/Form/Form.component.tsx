import React from "react";
import Link from "next/link";
import { IFormProps } from "./Form.type";

const Form: React.FC<IFormProps> = ({ isLogin, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Username</span>
      <input type="text" name="username" required />
    </label>
    <label>
      <span>Password</span>
      <input type="password" name="password" required />
    </label>
    {!isLogin && (
      <label>
        <span>Repeat password</span>
        <input type="password" name="rpassword" required />
      </label>
    )}

    <div className="submit">
      {isLogin ? (
        <>
          <Link href="/signup">
            <a>I don&apos;t have an account</a>
          </Link>
          <button type="submit">Login</button>
        </>
      ) : (
        <>
          <Link href="/login">
            <a>I already have an account</a>
          </Link>
          <button type="submit">Signup</button>
        </>
      )}
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}

    <style jsx>{`
      form,
      label {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      form {
        align-items: center;
        justify-content: center;
        min-width: 500px;
        padding: 16px;
      }

      label {
      }

      .submit {
        display: flex;
        gap: 8px;
        padding: 8px;
      }
    `}</style>
  </form>
);

export default Form;
