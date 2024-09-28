import { HStack, Text, Image, Box } from "@chakra-ui/react";

interface CardProps {
  title: string;
  icon: string;
  value: number;
  green?: boolean;
}

export const Card = ({ title, icon, value, green }: CardProps) => {
  const bgColor = green ? "#015F43" : "#323238";

  return (
    <>
      <Box
        backgroundColor={bgColor}
        padding={6}
        rounded="md"
        minW="260px"
        w="30%"
      >
        <HStack display="flex" justify="space-between" paddingBottom={2}>
          <Text color="#C4C4CC">{title}</Text>
          <Image src={icon} alt={`${icon.split("/")[1].split(".")[0]}`} />
        </HStack>
        <Box>
          <Text fontSize="3xl" as="b">
            {value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </Box>
      </Box>
    </>
  );
};
