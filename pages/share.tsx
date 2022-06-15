import { useState } from "react";
import type { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import fetchJson, { FetchError } from "../lib/fetch";
import { sessionOptions } from "../lib/session";
import type { PageWithUser } from "../shared/models/PageProps.type";
import ShareForm from "../components/ShareForm";
import { IVideo } from "../shared/models/Video";

export const getServerSideProps = withIronSessionSsr<PageWithUser>(function ({
  req,
  res,
}) {
  const user = req.session.user;
  if (!user) {
    res.setHeader("location", "/login");
    res.end();
    return {
      props: {},
    };
  }

  return {
    props: { user },
  };
},
sessionOptions);

const SharePage: NextPage = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (payload: Partial<IVideo>) => {
    try {
      setIsSharing(true);
      await fetchJson("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error happened:", error);
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          w: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {errorMsg ? (
          <Box sx={{ p: 2, width: "100%" }}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {errorMsg}
            </Alert>
          </Box>
        ) : null}

        <ShareForm isLoading={isSharing} handleSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default SharePage;
