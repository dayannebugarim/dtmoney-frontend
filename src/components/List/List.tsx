import { HamburgerIcon, AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  VStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";

interface ListProps {
  data: {
    title: string;
    value: number;
    type: string;
    category: string;
    date: string;
  }[];
}

export const List = ({ data }: ListProps) => {
  return (
    <>
      <Box paddingY={6} rounded="md" w="100%">
        <VStack w="100%" maxHeight="600px" overflow="scroll">
          {data.map((item) => {
            const valueColor = item.type === "income" ? "#00B37E" : "#F75A68";
            const valuePrefix = item.type === "income" ? "" : "- ";
            const value = `${valuePrefix}${item.value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}`;

            const date = new Date(item.date).toLocaleDateString();

            return (
              <HStack
                display="flex"
                justify="space-between"
                backgroundColor="#29292E"
                paddingX={10}
                paddingY={6}
                w="100%"
                rounded="md"
                spacing={10}
              >
                <Text color="#C4C4CC" minW="200px">
                  {item.title}
                </Text>
                <Text color={valueColor} minW="120px">
                  {value}
                </Text>
                <Text color="#C4C4CC">{item.category}</Text>
                <Text color="#C4C4CC">{date}</Text>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    border="none"
                    color="#7C7C8A"
                    _hover={{ bg: "#323238" }}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList bgColor="#29292E" border="none" boxShadow="dark-lg">
                    <MenuItem
                      icon={<AddIcon />}
                      bgColor="#29292E"
                      _hover={{ bg: "#323238" }}
                    >
                      Editar
                    </MenuItem>
                    <MenuItem
                      icon={<ExternalLinkIcon />}
                      bgColor="#29292E"
                      _hover={{ bg: "#323238" }}
                    >
                      Excluir
                    </MenuItem>
                  </MenuList>
                </Menu>
              </HStack>
            );
          })}
        </VStack>
      </Box>
    </>
  );
};
