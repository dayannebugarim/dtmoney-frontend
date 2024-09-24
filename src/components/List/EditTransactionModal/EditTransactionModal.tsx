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
import { TypeRadio } from "../../TypeRadio";
import {
  editTransactionRequest,
  listCategoriesRequest,
} from "@/services/http/transaction";
import { ListCategoriesResponse } from "@/services/http/transaction/types";
import { useAuthContext } from "@/contexts/AuthContext";

interface Data {
  id: string;
  value: number;
  type: string;
  description: string;
  categoryId?: string;
}

interface EditTransactionModalProps {
  data: Data;
  isOpen: boolean;
  onClose: () => void;
}

export const EditTransactionModal = ({
  data,
  isOpen,
  onClose,
}: EditTransactionModalProps) => {
  const { user } = useAuthContext();
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [categories, setCategories] = useState<ListCategoriesResponse[]>([]);
  const [categoryId, setCategoryId] = useState<string | undefined>("");
  const [type, setType] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getCategories() {
      if (!user?.id) return;

      const response = await listCategoriesRequest({ userId: user?.id });
      setCategories(response);
      setDescription(data.description);
      setValue(data.value);
      setCategoryId(data.categoryId);
      setType(data.type);
    }

    getCategories();
  }, [user?.id, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!user?.id) return;

      await editTransactionRequest({
        id: data.id,
        value,
        categoryId,
        description,
        type,
      });
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
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
          <ModalHeader>Editar transação</ModalHeader>
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
                        <option
                          key={category.id}
                          value={category.id}
                          style={{ background: "#29292E", color: "#7C7C8A" }}
                        >
                          {category.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl id="type">
                  <TypeRadio setType={setType} value={type} />
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
                  Salvar
                </Button>
              </VStack>
            </form>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};
