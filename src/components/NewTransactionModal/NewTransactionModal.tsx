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
import { useEffect, useState } from "react";
import { TypeRadio } from "../TypeRadio";
import {
  createCategoryRequest,
  createTransactionRequest,
  listCategoriesRequest,
} from "@/services/http/transaction";
import { ListCategoriesResponse } from "@/services/http/transaction/types";
import { ButtonComponent } from "../Button";
import { CreatableSelect, SingleValue } from "chakra-react-select";
import { useAuthContext } from "@/contexts/AuthContext";
import { chakraSelectStyles } from "@/styles/selectTheme";
import { useTransactionContext } from "@/contexts/TransactionsContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { toNumber } from "@/utils/toNumber";

type OptionType = {
  label: string;
  value: string;
};

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onClose,
}: NewTransactionModalProps) => {
  const { user } = useAuthContext();
  const { setHasUpdated } = useTransactionContext();
  const [description, setDescription] = useState("");
  const [value, setValue] = useState<string>('');
  const [categories, setCategories] = useState<ListCategoriesResponse[]>([]);
  const [categoryId, setCategoryId] = useState<string>();
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectLoading, setSelectIsLoading] = useState(false);

  useEffect(() => {
    async function getCategories() {
      if (!user?.id || !isOpen) return;

      const response = await listCategoriesRequest({ userId: user?.id });
      setCategories(response);
    }

    getCategories();
  }, [user?.id, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasUpdated(false);
    try {
      if (!user?.id) return;

      await createTransactionRequest({
        userId: user?.id,
        value: toNumber(value),
        categoryId: categoryId ?? null,
        description,
        type,
      });

      setHasUpdated(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      setCategoryId("");
      setDescription("");
      setType("");
      setValue("");
      onClose();
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatCurrency(inputValue);
    setValue(formattedValue);
  };

  const handleSelectChange = (newValue: unknown) => {
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

  const handleClose = () => {
    setCategoryId("");
    setDescription("");
    setType("");
    setValue("");
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
          minWidth={{
            "2xl": "500px",
            lg: "500px",
            md: "500px",
            sm: "90%",
            base: "90%",
          }}
          marginX="1rem"
          maxHeight="530px"
          p={8}
          rounded="md"
          boxShadow="dark-lg"
        >
          <ModalHeader paddingLeft={0} paddingTop={0} paddingBottom={6}>
            Nova transação
          </ModalHeader>
          <ModalCloseButton onClick={handleClose} />
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
                    required
                    value={value}
                    onChange={handleValueChange}
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
                    onChange={handleSelectChange}
                    onCreateOption={handleCreateCategory}
                    isLoading={isSelectLoading}
                    selectedOptionStyle="check"
                    placeholder="Crie ou selecione uma categoria"
                    options={options}
                    chakraStyles={chakraSelectStyles}
                  />
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
                <ButtonComponent
                  variant="primary"
                  isLoading={isLoading}
                  type="submit"
                  marginTop={8}
                  w="100%"
                >
                  Cadastrar
                </ButtonComponent>
              </VStack>
            </form>
          </VStack>
        </ModalContent>
      </Modal>
    </>
  );
};
