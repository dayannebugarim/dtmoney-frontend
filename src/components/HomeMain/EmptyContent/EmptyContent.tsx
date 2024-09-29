import {
  Button,
  Text,
  Box,
  useDisclosure,
  Heading,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { deleteTransactionRequest } from "@/services/http/transaction";
import React, { useState } from "react";
import { ButtonComponent } from "@/components/Button";
import { useTransactionContext } from "@/contexts/TransactionsContext";
import { NewTransactionModal } from "@/components/NewTransactionModal";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";

interface EmptyContentProps {
  type: "search" | "new";
}

export const EmptyContent = ({ type }: EmptyContentProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const content = {
    search: {
      icon: SearchIcon,
      title: "Nenhum resultado encontrado",
      text: "Não conseguimos achar o que você está procurando",
      hasButton: false,
    },
    new: {
      icon: AddIcon,
      title: "Nada por aqui",
      text: "Comece adicionando uma transação",
      hasButton: true,
    },
  };

  return (
    <>
      <VStack
        mt={6}
        padding={28}
        rounded="md"
        w="100%"
        backgroundColor="#29292E"
        border="1px"
        borderColor="#2e2e35"
        textAlign="center"
      >
        <Box rounded="full" padding={2}>
          <Icon as={content[type].icon} boxSize={8} color="#7C7C8A" />
        </Box>
        <Heading size="md">{content[type].title}</Heading>
        <Text mb={6} color="#7C7C8A">
          {content[type].text}
        </Text>
        {content[type].hasButton && (
          <ButtonComponent fontSize={14} onClick={onOpen} variant="primary">
            Nova Transação
          </ButtonComponent>
        )}
      </VStack>

      <NewTransactionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
