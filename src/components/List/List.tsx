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

interface ListProps {
  data: Transaction[];
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
      <Box paddingY={6} rounded="md" w="100%">
        <VStack w="100%">
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
                align={{
                  "2xl": "center",
                  lg: "center",
                  md: "center",
                  sm: "start",
                  base: "start",
                }}
                backgroundColor="#29292E"
                paddingX={10}
                paddingY={6}
                w="100%"
                rounded="md"
                border="1px"
                borderColor="#2e2e35"
                spacing={8}
                key={`list-item-${item.id}`}
              >
                <Box
                  // border="1px"
                  // borderColor="red"
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection={{
                    "2xl": "row",
                    lg: "row",
                    md: "row",
                    sm: "column",
                    base: "column",
                  }}
                >
                  <HStack
                    display="flex"
                    justify="space-between"
                    spacing={{
                      "2xl": 8,
                      lg: 8,
                      md: 8,
                      sm: 2,
                      base: 2,
                    }}
                    w={{
                      "2xl": "50%",
                      lg: "50%",
                      md: "45%",
                      sm: "100%",
                      base: "100%",
                    }}
                    // border="1px"
                    // borderColor="red"
                    flexDirection={{
                      "2xl": "row",
                      lg: "row",
                      md: "row",
                      sm: "column",
                      base: "column",
                    }}
                    align={{
                      "2xl": "center",
                      lg: "center",
                      md: "center",
                      sm: "start",
                      base: "start",
                    }}
                    pb={{
                      "2xl": 0,
                      lg: 0,
                      md: 0,
                      sm: 2,
                    }}
                  >
                    <Box maxW="60%">
                      <Text
                        color="#C4C4CC"
                        // border="1px" borderColor="red"
                      >
                        {item.description}
                      </Text>
                    </Box>
                    <Box minW="40%">
                      <Text
                        as="b"
                        textAlign="start"
                        color={valueColor}
                        // border="1px"
                        // borderColor="red"
                      >
                        {value}
                      </Text>
                    </Box>
                  </HStack>
                  <HStack
                    display="flex"
                    justify="space-between"
                    spacing={8}
                    w={{
                      "2xl": "40%",
                      lg: "40%",
                      md: "45%",
                      sm: "100%",
                      base: "100%",
                    }}
                    // border="1px"
                    // borderColor="red"
                  >
                    <HStack
                      color="#7C7C8A"
                      maxW="45%"
                      // border="1px"
                      // borderColor="red"
                    >
                      <Image src="icons/tag-icon.svg" alt="Tag icon" />

                      <Text>{item.category.name ?? "-"}</Text>
                    </HStack>
                    <HStack
                      color="#7C7C8A"
                      maxW="45%"
                      // border="1px"
                      // borderColor="red"
                    >
                      <Image src="icons/date-icon.svg" alt="Date icon" />
                      <Text>{date}</Text>
                    </HStack>
                  </HStack>
                </Box>

                <Box
                  // border="1px"
                  // borderColor="red"
                  display="flex"
                  justifyContent="center"
                  w="10%"
                >
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      border="none"
                      color="#7C7C8A"
                      _hover={{ bg: "#323238" }}
                      _active={{ bg: "#323238" }}
                      aria-label="Options"
                      icon={
                        <Image
                          src="icons/three-dots-vertical-icon.svg"
                          alt="Vertical three dots icon"
                        />
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
                </Box>
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
