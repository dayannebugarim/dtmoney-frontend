import { FormControl, HStack, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { ButtonComponent } from "../Button";
import { Transaction } from "@/services/http/transaction/types";

interface SearchProps {
  setDescription: Dispatch<SetStateAction<string | undefined>>;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
}

export const Search = ({
  setDescription,
  setIsLoaded,
  setTransactions,
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setDescription(searchTerm);
    setTransactions([]);
    setIsLoaded(false);
  };

  return (
    <>
      <form onSubmit={handleSearch} style={{ width: "100%" }}>
        <HStack w="100%">
          <FormControl id="search">
            <Input
              type="search"
              variant="filled"
              bg="#121214"
              placeholder="Busque por uma transação"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormControl>
          <ButtonComponent variant="search" type="submit">
            <strong>Buscar</strong>
          </ButtonComponent>
        </HStack>
      </form>
    </>
  );
};
