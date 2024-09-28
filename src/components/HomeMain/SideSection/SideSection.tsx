import { VStack } from "@chakra-ui/react";
import { LinearChart } from "./LinearChart";
import { GoalSection } from "./GoalSection";

export const SideSection = () => {
  return (
    <>
      <VStack
        minW="35%"
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
