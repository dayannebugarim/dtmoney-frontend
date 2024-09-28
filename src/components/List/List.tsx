import { Transaction } from "@/services/http/transaction/types";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
  Image,
} from "@chakra-ui/react";
import { EditTransactionModal } from "./EditTransactionModal";
import { useState } from "react";
import { DeleteTransactionAlert } from "./DeleteTransactionAlert";
import { ListSkeleton } from "./ListSkeleton";

interface ListProps {
  data: Transaction[];
  isLoaded: boolean;
}

interface TransactionData {
  id: string;
  value: number;
  type: string;
  description: string;
  categoryId?: string;
}

export const List = ({ data, isLoaded }: ListProps) => {
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

  const handleData = async (d: Transaction, type: "edit" | "del") => {
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
      {data && isLoaded ? (
        <>
          <Box paddingY={6} rounded="md" w="100%">
            <VStack w="100%">
              {data.map((item) => {
                const valueColor =
                  item.type === "Income" ? "#00B37E" : "#F75A68";
                const valuePrefix = item.type === "Income" ? "" : "- ";
                const value = `${valuePrefix}${item.value.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}`;

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
                    border="1px"
                    borderColor="#2e2e35"
                    spacing={8}
                    key={item.id}
                  >
                    <Text
                      color="#C4C4CC"
                      minW="20%"
                      // border="1px"
                      // borderColor="red"
                    >
                      {item.description}
                    </Text>
                    <Text
                      as="b"
                      color={valueColor}
                      minW="15%"
                      // border="1px"
                      // borderColor="red"
                    >
                      {value}
                    </Text>
                    <HStack
                      color="#7C7C8A"
                      minW="15%"
                      // border="1px"
                      // borderColor="red"
                    >
                      {item.category.name && <Image src="icons/tag-icon.svg" />}
                      <Text>{item.category.name}</Text>
                    </HStack>
                    <HStack
                      color="#7C7C8A"
                      minW="15%"
                      // border="1px"
                      // borderColor="red"
                    >
                      <Image src="icons/date-icon.svg" />
                      <Text>{date}</Text>
                    </HStack>

                    <Menu>
                      <MenuButton
                        as={IconButton}
                        border="none"
                        color="#7C7C8A"
                        _hover={{ bg: "#323238" }}
                        _active={{ bg: "#323238" }}
                        aria-label="Options"
                        icon={
                          <Image src="icons/three-dots-vertical-icon.svg" />
                        }
                        variant="outline"
                      />
                      <MenuList
                        bgColor="#121214"
                        borderColor="#29292e"
                        boxShadow="dark-lg"
                      >
                        <MenuItem
                          icon={<EditIcon />}
                          bgColor="#121214"
                          _hover={{ bg: "#16161a" }}
                          onClick={() => handleData(item, "edit")}
                        >
                          Editar
                        </MenuItem>
                        <MenuItem
                          icon={<DeleteIcon />}
                          bgColor="#121214"
                          _hover={{ bg: "#16161a" }}
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
      ) : (
        <ListSkeleton isLoaded={isLoaded} />
      )}
    </>
  );
};
