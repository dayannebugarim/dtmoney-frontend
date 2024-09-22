import { Container } from "@chakra-ui/react";
import { MainSection } from "./MainSection";

interface HomeMainProps {}

export const HomeMain = () => {
  return (
    <>
      <Container margin={0} padding={0}>
        <MainSection />
      </Container>
    </>
  );
};
