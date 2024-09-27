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
        <MenuList bgColor="#29292E" border="none" boxShadow="dark-lg">
          <MenuItem
            onClick={handleLogout}
            bgColor="#29292E"
            _hover={{ bg: "#323238" }}
          >
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
