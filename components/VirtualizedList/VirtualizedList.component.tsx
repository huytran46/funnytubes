import * as React from "react";
import Box from "@mui/material/Box";
import {
  FixedSizeList,
  ListChildComponentProps,
  FixedSizeListProps,
} from "react-window";

// function renderRow(props: ListChildComponentProps) {
//   const { index, style } = props;
//   return (
//     <ListItem style={style} key={index} component="div" disablePadding>
//       <ListItemButton>
//         <ListItemText primary={`Item ${index + 1}`} />
//       </ListItemButton>
//     </ListItem>
//   );
// }

interface Props extends FixedSizeListProps {
  //   renderRow(props: ListChildComponentProps): JSX.Element;
}

const VirtualizedList: React.FC<Props> = (props) => {
  const {
    height = 400,
    width = 360,
    // itemSize = 46,
    // itemCount = 200,
    // overscanCount = 5,
  } = props;

  return (
    <Box
      sx={{
        width: "100%",
        height,
        maxWidth: width,
        bgcolor: "background.paper",
      }}
    >
      <FixedSizeList {...props}>{props.children}</FixedSizeList>
    </Box>
  );
};

export default VirtualizedList;
