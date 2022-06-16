import { useState } from "react";
import Router from "next/router";
import type { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
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

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

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

const SignupPage: NextPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsSignUp(true);

      const data = new FormData(event.currentTarget);

      const body = {
        email: data.get("email")?.toString() ?? "",
        password: data.get("password")?.toString() ?? "",
        confirm: data.get("confirm")?.toString() ?? "",
      };

      await fetchJson("/api/signup", {
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
      setIsSignUp(false);
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
        <Stack direction="column" sx={{ gap: 2 }}>
          <Typography component="h1" variant="h3">
            Get started absolutely free.
          </Typography>

          <Typography component="h1" variant="h5" color="GrayText">
            Free forever. No credit card needed.
          </Typography>
        </Stack>

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

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm"
            type="password"
            id="confirm"
            autoComplete="confirm-password"
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loading={isSignUp}
          >
            Sign Up
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Already have an account? Sign in now!"}
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
          <Link color="inherit" href="/">
            Funnytubes
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupPage;
