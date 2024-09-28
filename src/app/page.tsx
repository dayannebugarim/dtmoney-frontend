"use client";
import { HomeHeader } from "@/components/HomeHeader";
import { HomeMain } from "@/components/HomeMain";
import { withAuth } from "@/components/withAuth";
import { Box, Container } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Container maxW="100vw" margin={0} padding={0}>
        <HomeHeader />
        <Box marginX={{ "2xl": "8rem", lg: "4rem", md: "2rem", sm: "1rem", base: "1rem" }}>
          <HomeMain />
        </Box>
      </Container>
    </>
  );
}

export default withAuth(Home);
