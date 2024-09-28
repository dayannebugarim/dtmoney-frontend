import { VStack } from "@chakra-ui/react";
import { LinearChart } from "./LinearChart";
import { GoalSection } from "./GoalSection";

export const SideSection = () => {
  return (
    <>
      <VStack
        width={{
          "2xl": "35%",
          lg: "35%",
          md: "100%",
          sm: "100%",
          base: "100%",
        }}
        // border="1px"
        // borderColor="red"
        spacing={6}
        height="100%"
      >
        <LinearChart />
        <GoalSection />
      </VStack>
    </>
  );
};
