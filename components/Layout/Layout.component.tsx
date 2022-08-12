import React, { useState, PropsWithChildren } from "react";
import Head from "next/head";
import Router from "next/router";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import { NextLinkComposed } from "../NextLinkMaterial";
import { IAccount } from "../../shared/models/Account";
import fetchJson from "../../lib/fetch";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      Go to <NextLinkComposed to="/share">share page</NextLinkComposed>
      {"."}
    </Typography>
  );
}

interface ILayoutProps {
  user?: IAccount;
}

const Layout: React.FC<PropsWithChildren<ILayoutProps>> = (props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: typeof window !== "undefined" ? window : undefined,
  });

  const [isLoggingOut, setLoggingOut] = useState(false);

  async function logout() {
    try {
      setLoggingOut(true);
      await fetchJson("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      await Router.push("/login");
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <Stack
      sx={{ width: "100%", height: "100%", minHeight: "100vh" }}
      direction="column"
    >
      <Head>
        <title>Funnytubes - videos-sharing platform</title>
      </Head>
      <AppBar position="sticky" color="inherit" elevation={trigger ? 1 : 0}>
        <Toolbar>
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Typography
              component={NextLinkComposed}
              variant="h6"
              color="inherit"
              noWrap
              to={{
                pathname: "/",
              }}
              sx={{
                textDecoration: "none",
              }}
            >
              Funnytubes
            </Typography>
            <Box sx={{ flex: 2 }} />
            {props.user ? (
              <>
                <Typography>
                  Welcome <b>{props.user.email}</b>
                </Typography>
                <Divider orientation="vertical" />
                <Button
                  component={NextLinkComposed}
                  to={{
                    pathname: "/share",
                  }}
                  variant="contained"
                >
                  Share
                </Button>
                <LoadingButton
                  onClick={() => logout()}
                  loading={isLoggingOut}
                  variant="outlined"
                  color="error"
                >
                  Logout
                </LoadingButton>
              </>
            ) : (
              <>
                <Button
                  component={NextLinkComposed}
                  to="/login"
                  variant="contained"
                >
                  Sign in
                </Button>
                <Button
                  component={NextLinkComposed}
                  to="/signup"
                  variant="outlined"
                >
                  Create new account
                </Button>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flex: 4 }}>
        {props.children}
      </Box>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Funnytubes
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Author: tranquochuy4698@gmail.com
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </Stack>
  );
};

export default Layout;
