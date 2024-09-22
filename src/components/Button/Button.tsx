import { Button } from "@chakra-ui/react";
import NextLink from "next/link";

interface ButtonProps {
  type: "primary" | "secondary";
  width?: string;
  href?: string;
  children: React.ReactNode;
}

interface Config {
  bg?: string;
  w?: string;
  px?: number;
  py?: number;
  variant?: string;
  _hover?: Object;
}

interface ConfigProps {
  primary: Config;
  secondary: Config;
}

export const ButtonComponent = ({
  type,
  width,
  href,
  children,
}: ButtonProps) => {
  const config: ConfigProps = {
    primary: {
      bg: "#00875F",
      w: width ?? "100%",
      px: 10,
      py: 6,
      variant: "solid",
      _hover: { bg: "#059A6E" },
    },
    secondary: {},
  };

  return (
    <>
      <Button
        as={href ? NextLink : Button}
        background={config[type].bg}
        color="white"
        paddingY={config[type].py}
        paddingX={config[type].px}
        _active={{
          transform: "scale(0.98)",
        }}
      >
        {children}
      </Button>
    </>
  );
};
