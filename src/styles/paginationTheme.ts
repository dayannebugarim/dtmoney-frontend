import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  variants: {
    paginationSelected: {
      backgroundColor: "#015F43",
      borderRadius: "md",
      color: "#E1E1E6",
      _hover: "none"
    },
    pagination: {
      backgroundColor: "#323238",
      borderRadius: "md",
      color: "#C4C4CC",
      _hover: "none"
    },
  },
})

const IconButton = defineStyleConfig({
  variants: {
    paginationControl: {
      backgroundColor: "none",
      borderRadius: "md",
      _hover: "none"
    }
  },
})

const chakraPaginationStyles = {
  components: { Button, IconButton }
};

export { chakraPaginationStyles }