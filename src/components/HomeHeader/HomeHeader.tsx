import { Box, Button, HStack, Image } from "@chakra-ui/react";
import { Card } from "./Card";
import { UserMenu } from "./UserMenu";
import { useAuthContext } from "@/contexts/AuthContext";

const cardsData = [
  {
    title: "Entradas",
    icon: "icons/income-icon.svg",
    value: 17400,
  },
  {
    title: "Saídas",
    icon: "icons/expense-icon.svg",
    value: 1259,
  },
  {
    title: "Total",
    icon: "icons/money-icon.svg",
    value: 16141,
  },
];

const userData = {
  name: "John Doe",
  email: "john@nivo.video",
  photo: "https://bit.ly/kent-c-dodds",
};

export const HomeHeader = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Box backgroundColor="#121214">
        <HStack
          display="flex"
          justify="space-between"
          align="center"
          spacing={6}
        >
          <Button
            background="#00875F"
            color="white"
            paddingY={6}
            variant="solid"
            _hover={{ bg: "#059A6E" }}
            _active={{
              transform: "scale(0.98)",
            }}
          >
            Nova Transação
          </Button>
          <Image src="/dtmoney-logo.svg" alt="DT Money Logo" />
          <UserMenu
            name={user?.name}
            email={user?.email}
          />
        </HStack>
        <HStack spacing={6}>
          {cardsData.map((data, index) => {
            return (
              <Card
                key={index}
                title={data.title}
                icon={data.icon}
                value={data.value}
                green={index === cardsData.length - 1 ? true : false}
              />
            );
          })}
        </HStack>
      </Box>
    </>
  );
};
