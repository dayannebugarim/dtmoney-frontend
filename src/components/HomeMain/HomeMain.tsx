import { Stack, VStack } from "@chakra-ui/react";
import { MainSection } from "./MainSection";
import { SideSection } from "./SideSection";

export const HomeMain = () => {
  return (
    <>
      <Stack
        my="6rem"
        minWidth="100%"
        // border="1px"
        // borderColor="red"
        spacing={6}
        align="start"
        flexDirection={{
          "2xl": "row",
          lg: "row",
          md: "column-reverse",
          sm: "column-reverse",
          base: "column-reverse",
        }}
      >
        <MainSection />
        <SideSection />
      </Stack>
    </>
  );
};
