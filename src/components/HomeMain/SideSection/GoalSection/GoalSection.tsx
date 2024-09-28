import { ButtonComponent } from "@/components/Button";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useBreakpoint } from "@chakra-ui/react";
import { useState } from "react";

export const GoalSection = () => {
  const [showDivider, setShowDivider] = useState(false);

  const breakpointType = useBreakpoint();
  const accordionBreakpoints = ["md", "sm", "base"];

  return (
    <>
      {!accordionBreakpoints.includes(breakpointType) ? (
        <Box borderColor="transparent" height="100%" width="100%">
          <HStack
            display="flex"
            justifyContent="space-between"
            paddingBottom={3}
          >
            <Heading size="sm">Minhas Metas</Heading>

            <ButtonComponent variant="primary">Criar Meta</ButtonComponent>
          </HStack>
          <Divider borderColor="#323238" />
          <VStack spacing={4} flexGrow={1} marginTop={2.5}>
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
      ) : (
        <Accordion
          allowToggle
          onChange={(e) => setShowDivider(e === 0 ? true : false)}
          borderColor="transparent"
          height="100%"
          width="100%"
        >
          <AccordionItem>
            <AccordionButton paddingLeft={0} paddingBottom={4}>
              <Box as={Heading} size="sm" flex="1" textAlign="left">
                Minhas Metas
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <Divider borderColor="#323238" />
            <AccordionPanel
              display="flex"
              flexDirection="column"
              gap={4}
              marginTop={2.5}
            >
              <ButtonComponent variant="primary" width="100%">
                Criar Meta
              </ButtonComponent>
              <Box
                rounded="md"
                height="200px"
                width="100%"
                backgroundColor="#29292E"
                border="1px"
                borderColor="#2e2e35"
              ></Box>
            </AccordionPanel>
            {showDivider ? <Divider borderColor="#323238" /> : <></>}
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};
