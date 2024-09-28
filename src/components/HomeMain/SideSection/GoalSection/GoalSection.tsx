import { ButtonComponent } from "@/components/Button";
import { Box, Divider, HStack, Heading, VStack } from "@chakra-ui/react";

export const GoalSection = () => {
  return (
    <>
      <Box height="100%" width="100%" 
      // border="1px" borderColor="red"
      >
        <HStack display="flex" justifyContent="space-between" paddingBottom={3}>
          <Heading size="sm">Minhas Metas</Heading>

          <ButtonComponent variant="primary">Criar Meta</ButtonComponent>
        </HStack>
        <Divider borderColor="#323238" />
        <VStack spacing={6} flexGrow={1} marginTop={2.5}>
          <Box
            rounded="md"
            height="200px"
            width="100%"
            backgroundColor="#29292E"
            border="1px"
            borderColor="#2e2e35"
          ></Box>
          <Box
            rounded="md"
            height="200px"
            width="100%"
            backgroundColor="#29292E"
            border="1px"
            borderColor="#2e2e35"
          ></Box>
        </VStack>
      </Box>
    </>
  );
};
