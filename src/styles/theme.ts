import { extendTheme } from "@chakra-ui/react";
import { chakraPaginationStyles } from "./paginationTheme";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

const themes = {
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
  styles: {
    global: {
      "html, body": {
        background: "#202024",
        color: "#E1E1E6",
        height: "100%",
      },
      input: {
        paddingY: 6,
        variant: "filled",
        background: "#121214",
        border: "1px !important",
        borderColor: "transparent !important",
        _hover: {
          background: "#121214 !important",
        },
        _focusVisible: {
          borderColor: "#00B37E !important",
          background: "#121214 !important",
        },
      },
      select: {
        variant: "filled",
        border: "1px !important",
        borderColor: "transparent !important",
        _hover: {
          background: "#121214 !important",
        },
        _focusVisible: {
          borderColor: "#00B37E !important",
          background: "#121214 !important",
        },
        _placeholder: {
          color: "gray.500",
        },
      },
    },
  },
  breakpoints: {
    base: '0em', // 0px
    sm: '30em', // ~480px. em is a relative unit and is dependant on the font-size.
    md: '48em', // ~768px
    lg: '76em', // ~
    xl: '80em', // ~1280px
    '2xl': '96em', // ~1536px
  },
  components: { ...chakraPaginationStyles.components },
};

const theme = extendTheme(themes);
export default theme;
