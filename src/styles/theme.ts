import { extendTheme } from "@chakra-ui/react";

const themes = {
  styles: {
    global: {
      'html, body': {
        background: '#121214b3',
        color: "#ffffff",
        height: '100%'
      },
    },
  },
}

const theme = extendTheme(themes);
export default theme;