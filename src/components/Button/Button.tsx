import { SearchIcon } from "@chakra-ui/icons";
import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { ReactElement, RefObject } from "react";

interface ButtonProps extends ChakraButtonProps {
  variant: "primary" | "secondary" | "search" | "red";
  href?: string;
  ref?: RefObject<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  isLoading?: boolean;
  children: React.ReactNode;
}

interface Config {
  bg?: string;
  w?: string;
  px?: number;
  py?: number;
  color?: string;
  variant?: string;
  borderColor?: string;
  icon?: ReactElement;
  hoverBg?: string;
}

interface ConfigProps {
  primary: Config;
  secondary: Config;
  search: Config;
  red: Config;
}

export const ButtonComponent = ({
  variant,
  type,
  ref,
  isLoading = false,
  children,
  ...restProps
}: ButtonProps) => {
  const config: ConfigProps = {
    primary: {
      bg: "#00875F",
      variant: "solid",
      hoverBg: "#059A6E",
    },
    secondary: {
      bg: "#29292E",
      variant: "solid",
      color: "#C4C4CC",
      hoverBg: "#34343a",
    },
    search: {
      icon: <SearchIcon />,
      color: "#00B37E",
      borderColor: "#00b37e",
      variant: "outline",
      hoverBg: "rgba(0, 179, 126, 0.05)"
    },
    red: {
      bg: "red.500",
      color: "white",
      hoverBg: "#F75A68",
    },
  };

  return (
    <>
      <Button
        type={type ?? "button"}
        ref={ref}
        background={config[variant].bg}
        variant={config[variant].variant}
        leftIcon={config[variant].icon}
        color={config[variant].color ?? "white"}
        borderColor={config[variant].borderColor}
        paddingY={6}
        paddingX={10}
        _hover={{ bg: config[variant].hoverBg }}
        _active={{
          transform: "scale(0.98)",
        }}
        isLoading={isLoading}
        {...restProps}
      >
        {children}
      </Button>
    </>
  );
};
