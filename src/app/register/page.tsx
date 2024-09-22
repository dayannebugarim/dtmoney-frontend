"use client";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Image,
  Container,
  Icon,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NextLink from "next/link";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <>
      <Container
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          bg="#202024"
          minWidth="500px"
          maxHeight="530px"
          p={8}
          rounded="md"
          boxShadow="dark-lg"
        >
          <Box
            alignItems="center"
            justifyContent="center"
            w="100%"
            paddingBottom={10}
            display="flex"
          >
            <Box
              as={NextLink}
              href="/login"
              background="none"
              color="white"
              position="relative"
              right="0px"
            >
              <Icon
                as={ArrowBackIcon}
                color="#7C7C8A"
                _hover={{ svg: { fill: "black" } }}
                boxSize={8}
              />
            </Box>
            <Image
              margin="auto"
              position="relative"
              right="16px"
              src="/dtmoney-logo.svg"
              alt="DT Money Logo"
            />
          </Box>
          <VStack spacing={10} w="100%">
            <VStack spacing={4} w="100%">
              <Input
                paddingY={6}
                variant="filled"
                bg="#121214"
                placeholder="Nome"
              />
              <Input
                paddingY={6}
                variant="filled"
                bg="#121214"
                placeholder="E-mail"
              />
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  bg="#121214"
                  paddingY={6}
                  variant="filled"
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    background="none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Icon color="#7C7C8A" as={ViewOffIcon} />
                    ) : (
                      <Icon color="#7C7C8A" as={ViewIcon} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  bg="#121214"
                  paddingY={6}
                  variant="filled"
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Repita a senha"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    background="none"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  >
                    {showRepeatPassword ? (
                      <Icon color="#7C7C8A" as={ViewOffIcon} />
                    ) : (
                      <Icon color="#7C7C8A" as={ViewIcon} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                marginTop={8}
                background="#00875F"
                color="white"
                w="100%"
                paddingY={6}
                variant="solid"
                _hover={{ bg: "#059A6E" }}
                _active={{
                  transform: "scale(0.98)",
                }}
              >
                Cadastrar
              </Button>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </>
  );
}
