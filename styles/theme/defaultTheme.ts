import { createTheme } from "@mui/material/styles";

const myCustomTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#212121",
      light: "#484848",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fafafa",
      light: "#ffffff",
      dark: "#c7c7c7",
      contrastText: "#000000",
    },
  },
});

export default myCustomTheme;
