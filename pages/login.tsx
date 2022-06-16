import { useState } from "react";
import Router from "next/router";
import type { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockIcon from '@mui/icons-material/Lock';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import fetchJson, { FetchError } from "../lib/fetch";
import { sessionOptions } from "../lib/session";
import type { NolayoutPage } from "../shared/models/PageProps.type";

export const getServerSideProps = withIronSessionSsr<NolayoutPage>(function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user) {
    res.setHeader("location", "/");
    res.statusCode = 302;
    res.end();
    return {
      props: {},
    };
  }

  return {
    props: { noLayout: true },
  };
},
sessionOptions);

const LoginPage: NextPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLogin(true);
      const data = new FormData(event.currentTarget);
      const body = {
        email: data.get("email")?.toString() ?? "",
        password: data.get("password")?.toString() ?? "",
      };
      await fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    } finally {
      setIsLogin(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isLogin}
          >
            Sign in
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          m: 8,
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
