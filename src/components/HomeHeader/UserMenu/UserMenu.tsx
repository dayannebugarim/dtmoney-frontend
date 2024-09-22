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

interface UserMenuProps {
  name: string;
  email: string;
  photo: string;
}

export const UserMenu = ({ name, email, photo }: UserMenuProps) => {
  return (
    <>
      <Menu direction="rtl">
        <MenuButton>
          <HStack spacing={4} padding={2} border="1px" borderColor="red">
            <VStack align="end" justify="center" border="1px" borderColor="red">
              <Text as="b">{name}</Text>
              <Text color="#7C7C8A">{email}</Text>
            </VStack>

            <Box border="1px" borderColor="red" padding={1}>
              <Avatar size="md" name={name} src={photo} />
            </Box>
            <ChevronDownIcon
              border="1px"
              borderColor="red"
              boxSize={4}
              color="#7C7C8A"
            />
          </HStack>
        </MenuButton>
        <MenuList bgColor="#29292E" border="none" boxShadow="dark-lg">
          <MenuItem bgColor="#29292E" _hover={{ bg: "#323238" }}>
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
