import type { NextPage } from "next";
import { withIronSessionSsr } from "iron-session/next";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NextLinkComposed } from "../components/NextLinkMaterial";
import { sessionOptions } from "../lib/session";
import { PageWithUser } from "../shared/models/PageProps.type";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const HomePage: NextPage = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h1"
            align="center"
            color="text.primary"
            fontWeight="bold"
            gutterBottom
          >
            Funnytubes
          </Typography>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            The user-friendly video-sharing platform
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Tell the world what digital content you&apos;re consuming 💿
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button
              size="large"
              component={NextLinkComposed}
              to={{
                pathname: "/login",
              }}
              variant="contained"
            >
              Start sharing now !!!
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image="images/fancy-dog.jpg"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">View</Button>
                  <Button size="small">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr<PageWithUser>(function ({
  res,
  req,
}) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const user = req.session.user;

  if (user) {
    return {
      props: { user },
    };
  }

  return {
    props: {},
  };
},
sessionOptions);

export default HomePage;
