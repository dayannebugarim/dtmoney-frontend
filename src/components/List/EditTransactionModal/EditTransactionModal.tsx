import {
  Alert,
  AlertIcon,
  FormControl,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { CreatableSelect, SingleValue } from "chakra-react-select";
import { useEffect, useState } from "react";
import { TypeRadio } from "../../TypeRadio";
import {
  createCategoryRequest,
  editTransactionRequest,
  listCategoriesRequest,
} from "@/services/http/transaction";
import { ListCategoriesResponse } from "@/services/http/transaction/types";
import { useAuthContext } from "@/contexts/AuthContext";
import { ButtonComponent } from "@/components/Button";
import { chakraSelectStyles } from "@/styles/selectTheme";
import { useTransactionContext } from "@/contexts/TransactionsContext";

type OptionType = {
  label: string;
  value: string;
};

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
  const { setHasUpdated } = useTransactionContext();
  const [description, setDescription] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [categories, setCategories] = useState<ListCategoriesResponse[]>([]);
  const [categoryId, setCategoryId] = useState<string | undefined>("");
  const [type, setType] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectLoading, setSelectIsLoading] = useState(false);

  useEffect(() => {
    setSelectIsLoading(true);
    async function getCategories() {
      if (!user?.id) return;

      const response = await listCategoriesRequest({ userId: user?.id });
      setCategories(response);
      setDescription(data.description);
      setValue(data.value);
      setCategoryId(data.categoryId);
      setType(data.type);
      setSelectIsLoading(false);
    }

    getCategories();
  }, [user?.id, isOpen, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasUpdated(false);
    try {
      if (!user?.id) return;

      await editTransactionRequest({
        id: data.id,
        value,
        categoryId,
        description,
        type,
      });

      setHasUpdated(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const handleChange = (newValue: unknown) => {
    if (newValue && typeof newValue === "object" && "value" in newValue) {
      const selectedOption = newValue as SingleValue<OptionType>;
      setCategoryId(selectedOption?.value);
    }
  };

  const handleCreateCategory = async (inputValue: string) => {
    setSelectIsLoading(true);
    try {
      if (!user?.id) return;

      const { id } = await createCategoryRequest({
        userId: user?.id,
        name: inputValue.trim(),
      });

      setCategories((prev) => [{ id, name: inputValue.trim() }, ...prev]);
      setCategoryId(id);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSelectIsLoading(false);
    }
  };

  const options = categories.map((category) => {
    return {
      value: category.id,
      label: category.name,
    };
  });

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
          <ModalHeader paddingLeft={0} paddingTop={0} paddingBottom={6}>
            Editar transação
          </ModalHeader>
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
                    placeholder="Adicione uma descrição"
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
                    placeholder="Digite o valor"
                  />
                </FormControl>
                <FormControl id="category">
                  <CreatableSelect
                    size="lg"
                    variant="filled"
                    isClearable
                    isDisabled={isSelectLoading}
                    onChange={handleChange}
                    onCreateOption={handleCreateCategory}
                    isLoading={isSelectLoading}
                    selectedOptionStyle="check"
                    placeholder="Crie ou selecione uma categoria"
                    options={options}
                    chakraStyles={chakraSelectStyles}
                  />
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
                <ButtonComponent
                  variant="primary"
                  isLoading={isLoading}
                  type="submit"
                  marginTop={8}
                  w="100%"
                >
                  Salvar
                </ButtonComponent>
              </VStack>
            </form>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};
