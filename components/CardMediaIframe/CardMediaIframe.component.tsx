import React from "react";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  isLoading: boolean;
  shareLink: string;
}

const CardMediaIframe: React.FC<Props> = (props) => {
  if (props.isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={460}
        height={275}
        sx={{
          borderRadius: 4,
        }}
      />
    );
  }

  return (
    <CardMedia
      component="iframe"
      width="460"
      height="275"
      src={props.shareLink}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      sx={{
        width: 460,
        height: 275,
        borderRadius: 4,
      }}
    />
  );
};

export default CardMediaIframe;
