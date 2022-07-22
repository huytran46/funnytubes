import type { IVideo } from "../shared/models/Video";
import type { NextPage } from "next";
import useSWR from "swr";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withIronSessionSsr } from "iron-session/next";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NextLinkComposed } from "../components/NextLinkMaterial";
import { sessionOptions } from "../lib/session";
import {
  PageWithPreloadedData,
  PageWithUser,
} from "../shared/models/PageProps.type";
import VideoSchema from "../shared/schema/Video.schema";
import CardMediaIframe from "../components/CardMediaIframe";
import VirtualizedList from "../components/VirtualizedList";
import dbConnect from "../lib/mongodb";

const HomePage: NextPage = () => {
  const { data: videos } = useSWR<IVideo[]>("/api/videos");
  const theme = useTheme();
  const matchesSMScreenSize = useMediaQuery(theme.breakpoints.down("sm"));

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
            Simplag Website 2
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
                pathname: "/share",
              }}
              variant="contained"
            >
              Start sharing now !!!
            </Button>
          </Stack>
        </Container>
      </Box>
      {/* End hero unit */}
      <Container sx={{ py: 8 }} maxWidth="md">
        <VirtualizedList
          height={1200}
          width={matchesSMScreenSize ? theme.breakpoints.values.xl : 900}
          itemCount={videos?.length ?? 10}
          itemSize={275}
          itemData={videos}
        >
          {(props) => {
            const { index, style, data } = props;
            const vid = data[index];
            return (
              <Box
                key={index}
                style={style}
                sx={{
                  p: 4,
                }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    borderRadius: 4,
                  }}
                >
                  <CardMediaIframe
                    isLoading={vid == null}
                    shareLink={vid?.url}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="h3">
                      {vid?.title}
                    </Typography>
                    <Typography variant="body1">{vid?.description}</Typography>
                  </CardContent>
                </Card>
              </Box>
            );
          }}
        </VirtualizedList>
      </Container>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr<
  PageWithPreloadedData & PageWithUser
>(async function ({ res, req }) {
  try {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    const user = req.session.user;

    // pre-fetch videos

    await dbConnect();

    const videoDocs = await VideoSchema.find();

    const videos =
      videoDocs?.map((vid) => ({
        _id: vid._id?.toString(),
        url: vid.url,
        title: vid.title ?? "",
        description: vid.description ?? "",
        sharerId: vid.sharerId.toString(),
      })) ?? [];

    return {
      props: {
        user: user ?? null,
        fallback: {
          "/api/videos": videos,
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        user: null,
        fallback: {
          "/api/videos": [],
        },
      },
    };
  }
}, sessionOptions);

export default HomePage;
