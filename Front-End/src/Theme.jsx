import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      primary: {
        main: "#528F3A",
      },
      background: {
        default: mode === "light" ? "#f4f4f4" : "#121212",
        paper: mode === "light" ? "rgba(255, 255, 255, 0.6)" : "rgba(30, 30, 30, 0.6)", // glass effect
      },
      text: {
        primary: mode === "light" ? "#000" : "#fff",
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            boxShadow:
              mode === "light"
                ? "0 4px 30px rgba(0,0,0,0.1)"
                : "0 4px 30px rgba(0,0,0,0.3)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          },
        },
      },
    },
  });
};
