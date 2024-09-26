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
import { ButtonComponent } from "@/components/Button";
import { useTransactionContext } from "@/contexts/TransactionsContext";

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
  const { setHasUpdated } = useTransactionContext();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    setHasUpdated(false);
    try {
      if (!id) return;

      await deleteTransactionRequest(id);
      setHasUpdated(true);
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
              <ButtonComponent
                variant="secondary"
                ref={cancelRef}
                onClick={onClose}
              >
                Cancelar
              </ButtonComponent>
              <ButtonComponent
                variant="red"
                isLoading={isLoading}
                onClick={handleSubmit}
                ml={3}
              >
                Deletar
              </ButtonComponent>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
