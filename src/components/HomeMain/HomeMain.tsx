import { HStack } from "@chakra-ui/react";
import { MainSection } from "./MainSection";
import { SideSection } from "./SideSection";

export const HomeMain = () => {
  return (
    <>
      <HStack
        my="6rem"
        minWidth="100%"
        // border="1px"
        // borderColor="red"
        spacing={6}
        align="start"
      >
        <MainSection />
        <SideSection />
      </HStack>
    </>
  );
};
