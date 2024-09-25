import { HStack, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { ButtonComponent } from "../Button";

interface SearchProps {
  setDescription: Dispatch<SetStateAction<string | undefined>>;
}

export const Search = ({ setDescription }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    setDescription(searchTerm);
  };

  return (
    <>
      <HStack w="100%">
        <Input
          type="search"
          variant="filled"
          bg="#121214"
          placeholder="Busque por uma transação"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ButtonComponent variant="search" onClick={handleSearch}>
          <strong>Buscar</strong>
        </ButtonComponent>
      </HStack>
    </>
  );
};
