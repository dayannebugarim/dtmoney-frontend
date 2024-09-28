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

interface UserMenuProps {
  name: string | undefined;
  email: string | undefined;
  photo?: string | undefined;
}

export const UserMenu = ({ name, email, photo }: UserMenuProps) => {
  const router = useRouter();

  const handleLogout = () => {
    destroyCookie(null, "token");
    destroyCookie(null, "refreshToken");
    router.push("/login");
  };

  return (
    <>
      <Menu direction="rtl">
        <MenuButton>
          <HStack spacing={4} padding={2}>
            <VStack align="end" justify="center" spacing={1}>
              <Text as="b">{name}</Text>
              <Text color="#7C7C8A">{email}</Text>
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
