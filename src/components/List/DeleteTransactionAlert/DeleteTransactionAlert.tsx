import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { deleteTransactionRequest } from "@/services/http/transaction";
import React, { useState } from "react";

interface DeleteTransactionAlertProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteTransactionAlert = ({
  id,
  isOpen,
  onClose,
}: DeleteTransactionAlertProps) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    try {
      if (!id) return;

      await deleteTransactionRequest(id);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay backdropFilter="blur(10px)">
          <AlertDialogContent bg="#202024">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Transação
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Você não pode desfazer esta ação depois.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                bg="#29292E"
                color="#C4C4CC"
                _hover={{ bg: "#313136" }}
              >
                Cancelar
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="red"
                onClick={handleSubmit}
                ml={3}
                _hover={{ bg: "#F75A68" }}
              >
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
