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
  components: { ...chakraPaginationStyles.components },
};

const theme = extendTheme(themes);
export default theme;
