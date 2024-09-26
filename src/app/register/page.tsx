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
  Alert,
  AlertIcon,
  FormControl,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import NextLink from "next/link";
import { ButtonComponent } from "@/components/Button";
import { createUserRequest } from "@/services/http/user";
import { useRouter } from "next/navigation";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return hasLetters && hasNumbers;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      setError("As senhas não correspondem.");
      return;
    }

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (!validatePassword(password)) {
      setError("A senha deve conter pelo menos letras e números.");
      return;
    }

    setIsLoading(true);
    try {
      await createUserRequest({ name, email, password });
      router.push("/login");
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
            <form onSubmit={handleRegister} style={{ width: "100%" }}>
              <VStack spacing={4} w="100%">
                <FormControl id="name">
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    paddingY={6}
                    variant="filled"
                    bg="#121214"
                    placeholder="Nome"
                  />
                </FormControl>
                <FormControl id="email">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      pr="4.5rem"
                      bg="#121214"
                      paddingY={6}
                      variant="filled"
                      type={showPassword ? "text" : "password"}
                      placeholder="Senha"
                    />
                    <InputRightElement width="4.5rem" height="52px">
                      <Button
                        background="none"
                        onClick={() => setShowPassword(!showPassword)}
                        _hover={{ bg: "none" }}
                      >
                        {showPassword ? (
                          <Icon color="#7C7C8A" as={ViewOffIcon} />
                        ) : (
                          <Icon color="#7C7C8A" as={ViewIcon} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="repeat-password">
                  <InputGroup size="md">
                    <Input
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                      pr="4.5rem"
                      bg="#121214"
                      paddingY={6}
                      variant="filled"
                      type={showRepeatPassword ? "text" : "password"}
                      placeholder="Repita a senha"
                    />
                    <InputRightElement width="4.5rem" height="52px">
                      <Button
                        background="none"
                        onClick={() =>
                          setShowRepeatPassword(!showRepeatPassword)
                        }
                        _hover={{ bg: "none" }}
                      >
                        {showRepeatPassword ? (
                          <Icon color="#7C7C8A" as={ViewOffIcon} />
                        ) : (
                          <Icon color="#7C7C8A" as={ViewIcon} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {error && (
                  <Alert
                    status="error"
                    borderRadius="md"
                    marginBottom={-8}
                    background="none"
                    color="#F75A68"
                    padding={2}
                    fontSize="0.9rem"
                  >
                    <AlertIcon />
                    {error}
                  </Alert>
                )}
                <ButtonComponent
                  isLoading={isLoading}
                  type="submit"
                  variant="primary"
                  marginTop={8}
                  w="100%"
                >
                  Cadastrar
                </ButtonComponent>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
    </>
  );
}
