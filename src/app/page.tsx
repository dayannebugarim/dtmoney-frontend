"use client";
import { HomeHeader } from "@/components/HomeHeader";
import { HomeMain } from "@/components/HomeMain";
import { withAuth } from "@/components/withAuth";
import { Container } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Container maxW="100vw" margin={0} padding={0}>
        <HomeHeader />
        <HomeMain />
      </Container>
    </>
  );
}

export default withAuth(Home);
