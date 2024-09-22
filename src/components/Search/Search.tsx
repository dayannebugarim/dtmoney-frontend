import { SearchIcon } from "@chakra-ui/icons";
import { Button, HStack, Input } from "@chakra-ui/react";

interface SearchProps {}

export const Search = ({}: SearchProps) => {
  return (
    <>
      <HStack w="100%">
        <Input
          paddingY={6}
          variant="filled"
          bg="#121214"
          placeholder="Busque por uma transação"
        />
        <Button
          leftIcon={<SearchIcon />}
          color="#00B37E"
          borderColor="#00B37E"
          variant="outline"
          paddingY={6}
          paddingX={10}
        >
          <strong>Buscar</strong>
        </Button>
      </HStack>
    </>
  );
};
