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
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  CheckIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { ChangeEvent, useState } from "react";
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
  const [isPasswordFieldFocus, setIsPasswordFieldFocus] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isMinLength = password.length >= 8;
  const hasLettersAndNumbers = /[a-zA-Z]/.test(password) && /\d/.test(password);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isMinLength) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (!hasLettersAndNumbers) {
      setError("A senha deve conter pelo menos letras e números.");
      return;
    }
    setIsLoading(true);
    try {
      await createUserRequest({ name, email, password });
      router.push("/login");
    } catch (error: any) {
      const { request } = error;
      const { message } = JSON.parse(request.response);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (repeatPassword && e.target.value !== repeatPassword) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleChangeRepeatPassword = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <>
      <Container
        h="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#121214b3"
        minWidth="100vw"
      >
        <Box
          bg="#202024"
          minWidth={{
            "2xl": "500px",
            lg: "500px",
            md: "500px",
            sm: "90%",
            base: "90%",
          }}
          marginX="1rem"
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
                      onChange={handleChangePassword}
                      onFocus={() => setIsPasswordFieldFocus(true)}
                      onBlur={() => setIsPasswordFieldFocus(false)}
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
                  {isPasswordFieldFocus && (
                    <Alert
                      borderRadius="md"
                      background="none"
                      padding={2}
                      fontSize="0.9rem"
                      rounded="md"
                      flexDirection="column"
                      alignItems="start"
                      justifyContent="center"
                      textAlign="start"
                    >
                      <AlertDescription
                        color={isMinLength ? "#00B37E" : "#7C7C8A"}
                      >
                        {isMinLength ? <Icon as={CheckIcon} /> : ""} Pelo menos
                        8 caracteres
                      </AlertDescription>

                      <AlertDescription
                        color={hasLettersAndNumbers ? "#00B37E" : "#7C7C8A"}
                      >
                        {hasLettersAndNumbers ? <Icon as={CheckIcon} /> : ""}{" "}
                        Pelo menos letras e números
                      </AlertDescription>
                    </Alert>
                  )}
                </FormControl>
                <FormControl id="repeat-password">
                  <InputGroup size="md">
                    <Input
                      value={repeatPassword}
                      onChange={handleChangeRepeatPassword}
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
                  {!passwordsMatch && (
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
                      As senhas não correspondem.
                    </Alert>
                  )}
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
                  isDisabled={
                    !name ||
                    !email ||
                    !password ||
                    !repeatPassword ||
                    !passwordsMatch ||
                    !isMinLength
                  }
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
