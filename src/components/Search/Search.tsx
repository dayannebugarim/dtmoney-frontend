import { SearchIcon } from "@chakra-ui/icons";
import { Button, HStack, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";

interface SearchProps {
  setDescription: Dispatch<SetStateAction<string | undefined>>
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
          paddingY={6}
          variant="filled"
          bg="#121214"
          placeholder="Busque por uma transação"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          leftIcon={<SearchIcon />}
          color="#00B37E"
          borderColor="#00B37E"
          variant="outline"
          paddingY={6}
          paddingX={10}
          onClick={handleSearch}
        >
          <strong>Buscar</strong>
        </Button>
      </HStack>
    </>
  );
};
