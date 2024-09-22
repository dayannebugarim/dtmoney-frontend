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
  FormControl,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { signInRequest } from "@/services/http/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(email, password)
    try {
      const response = await signInRequest({ email, password });
      
      const { token, refreshToken } = response
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

      router.push("/");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
            <form onSubmit={handleLogin} style={{ width: "100%" }}>
              <VStack spacing={4} w="100%">
                <FormControl id="email">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    paddingY={6}
                    variant="filled"
                    bg="#121214"
                    placeholder="E-mail"
                  />
                </FormControl>
                <FormControl id="password">
                  <InputGroup size="md">
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
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
                </FormControl>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                <Button
                  isLoading={isLoading}
                  type="submit"
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
                  Entrar
                </Button>
              </VStack>
            </form>
            <Divider borderColor="#29292E" />
            <HStack align="center" justify="space-between" w="100%">
              <Text color="#7C7C8A">Não possui uma conta ainda?</Text>

              <Button
                as={NextLink}
                href="/register"
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
