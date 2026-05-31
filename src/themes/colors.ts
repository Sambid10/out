export const lightTheme = {
  mode: "light",
  colors: {
    background: "#EDE9E6",
    text: "#111111",
    primary: "#6D28D9",
    card: "#FFFFFF",
    border: "#E5E5E5",
    inputbg:"#ffffff",
     inputtxt:"#121212",
  },
}

export const darkTheme = {
  mode: "dark",
  colors: {
    background: "#121212",
    text: "#FFFFFF",
    primary: "#8B5CF6",
    card: "#232323",
    border: "#333333",
    inputbg:"#1E1E1E",
    inputtxt:"#ffffff"
  },
}

export type Theme = typeof lightTheme