import { ChakraStylesConfig } from "chakra-react-select";

const chakraSelectStyles: ChakraStylesConfig = {
  option: (provided) => ({
    ...provided,
    bg: "#121214",
    _selected: {
      bg: "#121214",
    },
    _hover: {
      bg: "#16161a",
    },
    fontSize: "1rem",
  }),
  menuList: (provided) => ({
    ...provided,
    bg: "#121214",
    border: "1px",
    borderColor: "#29292e",
    boxShadow: "dark-lg",
  }),
  input: (provided) => ({
    ...provided,
    border: "none !important",
  }),
  control: (provided) => ({
    ...provided,
    fontSize: "16px",
    border: "1px",
    height: "50px",
    borderColor: "transparent",
    bg: "#121214",
    _focus: {
      bg: "#121214",
      borderColor: "#00B37E",
    },
    _hover: {
      bg: "#121214",
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    bg: "transparent",
    p: 0,
    w: 6,
    mx: 2,
    cursor: "inherit",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

export { chakraSelectStyles };
