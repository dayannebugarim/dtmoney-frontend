import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TypeRadio } from "./TypeRadio";
import {
  createTransactionRequest,
  listCategoriesRequest,
} from "@/services/http/transaction";
import { ListCategoriesResponse } from "@/services/http/transaction/types";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  token: string | null;
}

export const NewTransactionModal = ({
  isOpen,
  onClose,
  userId,
  token,
}: NewTransactionModalProps) => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<number>();
  const [categories, setCategories] = useState<ListCategoriesResponse[]>([]);
  const [categoryId, setCategoryId] = useState<string>();
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCategories() {
      if (!userId || !token || !isOpen) return;

      const response = await listCategoriesRequest({ userId, token });

      setCategories(response);
    }

    getCategories();
  }, [userId, token, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!userId || !token) return;

      await createTransactionRequest({
        userId,
        value: value ?? 0,
        categoryId: categoryId ?? null,
        description,
        type,
        token,
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setCategoryId("")
      setDescription("")
      setType("")
      setValue(undefined)
      onClose();
    }
  };

  return (
    <>
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent
          bg="#202024"
          minWidth="500px"
          maxHeight="530px"
          p={8}
          rounded="md"
          boxShadow="dark-lg"
        >
          <ModalHeader>Nova transação</ModalHeader>
          <ModalCloseButton />
          <VStack spacing={10} w="100%">
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <VStack spacing={4} w="100%">
                <FormControl id="description">
                  <Input
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    paddingY={6}
                    variant="filled"
                    bg="#121214"
                    placeholder="Descrição"
                  />
                </FormControl>
                <FormControl id="value">
                  <Input
                    type="number"
                    required
                    value={value}
                    onChange={(e) => setValue(+e.target.value)}
                    paddingY={6}
                    variant="filled"
                    bg="#121214"
                    placeholder="Preço"
                  />
                </FormControl>
                <FormControl id="category">
                  <Select
                    size="lg"
                    onChange={(e) => setCategoryId(e.target.value)}
                    variant="filled"
                    bg="#121214"
                    placeholder="Categoria"
                    color="gray.500"
                    fontSize="1rem"
                  >
                    {categories.map((category) => {
                      return (
                        <option key={category.id} value={category.id} style={{ background: '#29292E', color: "#7C7C8A" }}>
                          {category.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl id="type">
                  <TypeRadio setType={setType} />
                </FormControl>

                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                <Button
                  isLoading={isLoading}
                  type="submit"
                  marginTop={8}
                  background="#00875F"
                  color="white"
                  w="100%"
                  paddingY={6}
                  variant="solid"
                  _hover={{ bg: "#059A6E" }}
                  _active={{
                    transform: "scale(0.98)",
                  }}
                >
                  Cadastrar
                </Button>
              </VStack>
            </form>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};
