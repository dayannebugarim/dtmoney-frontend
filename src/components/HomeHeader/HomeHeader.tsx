"use client"
import { Box, Button, HStack, Image, useDisclosure } from "@chakra-ui/react";
import { Card } from "./Card";
import { UserMenu } from "./UserMenu";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { transactionsSummaryRequest } from "@/services/http/transaction";
import { TransactionsSummaryResponse } from "@/services/http/transaction/types";
import { NewTransactionModal } from "../NewTransactionModal";
import { parseCookies } from "nookies";

interface SummaryCard {
  title: string
  icon: string
  value: number
}

export const HomeHeader = () => {
  const { user } = useAuthContext();
  console.log('user', user)
  const cookies = parseCookies();
  const token = cookies["token"];
  console.log(token)
  const [summary, setSummary] = useState<TransactionsSummaryResponse>();
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    async function getSummaryData() {
      if (!user?.id || !token) return

      const response = await transactionsSummaryRequest(user?.id, token)

      setSummary(response)
    }

    getSummaryData()
  }, [token, user?.id])

  const cardsData: SummaryCard[] = [
    {
      title: "Entradas",
      icon: "icons/income-icon.svg",
      value: summary?.totalIncome ?? 0,
    },
    {
      title: "Saídas",
      icon: "icons/expense-icon.svg",
      value: summary?.totalExpense ?? 0,
    },
    {
      title: "Total",
      icon: "icons/money-icon.svg",
      value: summary?.total ?? 0,
    },
  ]

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
            onClick={onOpen}
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

      <NewTransactionModal isOpen={isOpen} onClose={onClose} userId={user?.id} token={token} />
    </>
  );
};
