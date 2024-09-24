import { SearchTransactionResponse } from "@/services/http/transaction/types";
import { HamburgerIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
  useDisclosure,
} from "@chakra-ui/react";
import { EditTransactionModal } from "./EditTransactionModal";
import { useState } from "react";
import { DeleteTransactionAlert } from "./DeleteTransactionAlert";

interface ListProps {
  data: SearchTransactionResponse[];
}

interface TransactionData {
  id: string;
  value: number;
  type: string;
  description: string;
  categoryId?: string;
}

export const List = ({ data }: ListProps) => {
  const [transactionData, setTransactionData] = useState<TransactionData>(
    {} as TransactionData
  );
  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onClose: deleteOnClose,
  } = useDisclosure();

  const handleData = async (d: SearchTransactionResponse, type: "edit" | "del") => {
    setTransactionData({
      id: d.id,
      value: d.value,
      type: d.type,
      description: d.description,
      categoryId: d.category.id ?? undefined,
    });

    type === "edit" ? editOnOpen() : deleteOnOpen();
  };

  return (
    <>
      <Box paddingY={6} rounded="md" w="100%">
        <VStack w="100%" maxHeight="600px" overflow="scroll">
          {data.map((item) => {
            const valueColor = item.type === "Income" ? "#00B37E" : "#F75A68";
            const valuePrefix = item.type === "Income" ? "" : "- ";
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
                key={item.id}
              >
                <Text color="#C4C4CC" minW="200px">
                  {item.description}
                </Text>
                <Text color={valueColor} minW="120px">
                  {value}
                </Text>
                <Text color="#C4C4CC">{item.category.name}</Text>
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
                      icon={<EditIcon />}
                      bgColor="#29292E"
                      _hover={{ bg: "#323238" }}
                      onClick={() => handleData(item, "edit")}
                    >
                      Editar
                    </MenuItem>
                    <MenuItem
                      icon={<DeleteIcon />}
                      bgColor="#29292E"
                      _hover={{ bg: "#323238" }}
                      onClick={() => handleData(item, "del")}
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

      <EditTransactionModal
        data={transactionData}
        isOpen={editIsOpen}
        onClose={editOnClose}
      />

      <DeleteTransactionAlert
        id={transactionData.id}
        isOpen={deleteIsOpen}
        onClose={deleteOnClose}
      />
    </>
  );
};
