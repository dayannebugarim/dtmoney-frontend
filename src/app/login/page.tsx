"use client";
import {
  Box,
  Button,
  Divider,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Text,
  Image,
  Container,
  Icon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

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
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="100%"
            paddingBottom={10}
          >
            <Image src="/dtmoney-logo.svg" alt="DT Money Logo" />
          </Box>
          <VStack spacing={10} w="100%">
            <VStack spacing={4} w="100%">
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
                  <Button background="none" onClick={handleClick}>
                    {showPassword ? (
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
              >
                Entrar
              </Button>
            </VStack>
            <Divider borderColor="#29292E" />
            <HStack align="center" justify="space-between" w="100%">
              <Text color="#7C7C8A">Não possui uma conta ainda?</Text>

              <Button
                background="#29292E"
                color="white"
                paddingY={6}
                paddingX={10}
                variant="solid"
              >
                Cadastrar
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Container>
    </>
  );
}

export { Login };
