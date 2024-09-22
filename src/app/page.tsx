"use client";
import { HomeHeader } from "@/components/HomeHeader";
import { HomeMain } from "@/components/HomeMain";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Container maxW="100vw" margin={0} padding={0}>
        <HomeHeader />
        <HomeMain />
      </Container>
    </>
  );
}
