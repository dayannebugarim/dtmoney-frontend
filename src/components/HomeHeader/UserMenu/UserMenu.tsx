import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  HStack,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Avatar,
  Image,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { useBreakpoint } from "@chakra-ui/react";

interface UserMenuProps {
  name: string | undefined;
  email: string | undefined;
  photo?: string | undefined;
}

export const UserMenu = ({ name, email, photo }: UserMenuProps) => {
  const breakpointType = useBreakpoint();
  const hideEmailBreakpoints = ["md", "sm", "base"];
  const hideNameBreakpoints = ["sm", "base"];
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "token");
    destroyCookie(null, "refreshToken");
    router.push("/login");
  };

  const formatName = (name: string) => {
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastNames = nameParts.slice(1);

    const formattedLastNames = lastNames
      .map((lastName) => lastName.charAt(0).toUpperCase() + ".")
      .join(" ");

    return `${firstName} ${formattedLastNames}`;
  };

  return (
    <>
      <Menu direction="rtl">
        <MenuButton>
          <HStack spacing={4} padding={2}>
            <VStack align="end" justify="center" spacing={1}>
              {!hideNameBreakpoints.includes(breakpointType) ? (
                <Text as="b">
                  {breakpointType === "md" && name ? formatName(name) : name}
                </Text>
              ) : (
                <></>
              )}
              {!hideEmailBreakpoints.includes(breakpointType) ? (
                <Text color="#7C7C8A">{email}</Text>
              ) : (
                <></>
              )}
            </VStack>

            <Box padding={1}>
              <Avatar size="md" name={name} src={photo} />
            </Box>
            <ChevronDownIcon boxSize={4} color="#7C7C8A" />
          </HStack>
        </MenuButton>
        <MenuList bgColor="#121214" borderColor="#29292e" boxShadow="dark-lg">
          <MenuItem
            icon={<Image src="icons/logout-icon.svg" alt="Logout icon" />}
            onClick={handleLogout}
            bgColor="#121214"
            _hover={{ bg: "#16161a" }}
          >
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
