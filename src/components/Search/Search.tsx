import { FormControl, HStack, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { ButtonComponent } from "../Button";

interface SearchProps {
  setDescription: Dispatch<SetStateAction<string | undefined>>;
}

export const Search = ({ setDescription }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setDescription(searchTerm);
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
