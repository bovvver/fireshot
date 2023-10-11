import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import { green } from "@mui/material/colors";
import colors from "./colorTheme";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: green[700],
    },
    secondary: {
      main: colors.gray,
    },
    error: {
      main: colors.red,
    },
  },
  typography: {
    h1: {
      fontSize: "3.1rem",
    },
    h2: {
      fontSize: "2.8rem",
    },
    h3: {
      fontSize: "1.9rem",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          "& #root": {
            width: "100%",
            minHeight: "100vh",
          },
        },
      },
    },
  },
});

const AppTheme = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
