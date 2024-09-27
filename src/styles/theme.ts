import { extendTheme } from "@chakra-ui/react";
import { chakraPaginationStyles } from "./paginationTheme";

const themes = {
  styles: {
    global: {
      'html, body': {
        background: '#202024',
        color: "#ffffff",
        height: '100%'
      },
      'input': {
        paddingY: 6,
        variant: "filled",
        background: "#121214",
        _hover: {
          background: "#121214 !important"
        },
        _focusVisible: {
          borderColor:  "#00B37E !important",
          background: "#121214 !important"
        }
      },
      'select': {
        variant: "filled",
        _hover: {
          background: "#121214 !important"
        },
        _focusVisible: {
          borderColor:  "#00B37E !important",
          background: "#121214 !important"
        },
        _placeholder: {
          color: "gray.500"
        }
      }
    },
  },
  components: {...chakraPaginationStyles.components}
}

const theme = extendTheme(themes);
export default theme;