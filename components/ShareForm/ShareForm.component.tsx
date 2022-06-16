import { useMemo } from "react";
import Paper, { PaperProps } from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import LinkIcon from '@mui/icons-material/Link';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import { IFormInputs } from "./ShareForm.type";

const StyledShareForm = styled(Paper)<PaperProps>(({ theme }) => ({
  padding: theme.spacing(6),
  minWidth: 600,
  width: "fit-content",
}));



const schema = z
  .object({
    url: z
      .string()
      .url({ message: "Invalid URL" })
      .min(1, { message: "URL cannot be empty" }),
    title: z
      .string()
      .min(6, { message: "title must has at least 6 characters" }),
    description: z
      .string()
      .min(6, { message: "description must has at least 6 characters" })
      .max(50, { message: "description cannot exceed 50 characters" }),
  })
  .required();

interface Props {
  isLoading: boolean;
  handleSubmit: (payload: IFormInputs) => Promise<void>;
}

const ShareForm: React.FC<Props> = (props) => {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  });

  const shareLinkChunks = watch("url")?.split("/");

  const shareLink = useMemo(
    () =>
      shareLinkChunks?.[shareLinkChunks?.length - 1]
        ? `https://www.youtube.com/embed/${
            shareLinkChunks[shareLinkChunks?.length - 1]
          }`
        : "",
    [shareLinkChunks]
  );

  const onSubmit: SubmitHandler<IFormInputs> = async (data: IFormInputs) => {
    try {
      const chunks = data?.url?.split("/");
      const videoKey = chunks?.[chunks?.length - 1];
      data = { ...data, url: `https://www.youtube.com/embed/${videoKey}` };
      await props.handleSubmit(data);
      resetForm();
    } catch (error) {
      throw error;
    }
  };

  return (
    <StyledShareForm variant="outlined" data-testid="share-from">
      <Stack direction="row" alignItems="center">
        <Stack direction="column" sx={{ gap: 1, minWidth: 300 }}>
          <Divider>
            <Avatar sx={{ m: 1, bgcolor: "error.main" }}>
              <Icon>smart_display</Icon>
            </Avatar>
          </Divider>
          <Typography
            component="h1"
            variant="h4"
            color="error"
            sx={{ textAlign: "center", textTransform: "uppercase" }}
          >
            Share a Youtube movie
          </Typography>
          <Stack
            component="form"
            direction="column"
            alignItems="center"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              mt: 4,
              gap: 2,
              w: "100%",
            }}
          >
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              label="Youtube URL"
              type="text"
              error={Boolean(errors.url)}
              helperText={errors.url?.message}
              {...register("url")}
              aria-label="share-form-url-text-field"
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              label="Title"
              type="text"
              error={Boolean(errors.title)}
              helperText={errors.title?.message}
              {...register("title")}
              aria-label="share-form-title-text-field"
            />

            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              label="Description"
              type="text"
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              {...register("description")}
              aria-label="share-form-description-text-field"
            />

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              color="error"
              loading={props.isLoading}
              aria-label="share-form-submit-button"
            >
              Share
            </LoadingButton>
          </Stack>
        </Stack>
        <Divider sx={{ mx: 4, height: 315 }} orientation="vertical" />
        {shareLink === "" ? (
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              borderRadius: 4,
              height: 315,
              width: 460,
              border: "1px dashed black",
            }}
          >
            <Typography>This is a preview section</Typography>
          </Box>
        ) : (
          <Box
            component="iframe"
            width="560"
            height="315"
            src={shareLink}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            aria-label="share-form-preview-iframe"
            sx={{
              borderRadius: 4,
            }}
          />
        )}
      </Stack>
    </StyledShareForm>
  );
};

export default ShareForm;
