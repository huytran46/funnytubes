import type { NextPage } from "next";
import { useState, FormEvent } from "react";
import Router from "next/router";
import Form from "../components/Form";
import { useUser } from "../shared/hooks/use-user.hook";

const Login: NextPage = () => {
  useUser({ redirectTo: "/", redirectIfFound: true });
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      username: (e.currentTarget as any).username.value,
      password: (e.currentTarget as any).password.value,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg((error as any)?.message);
    }
  }

  return (
    <div className="re-login-page">
      <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
      <style jsx>{`
        .re-login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          min-width: 100vw;
          width: 100%;
          height: 100%;
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

export default Login;
