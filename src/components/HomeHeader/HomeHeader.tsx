"use client";
import { HStack, Image, useDisclosure, VStack } from "@chakra-ui/react";
import { Card } from "./Card";
import { UserMenu } from "./UserMenu";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { transactionsSummaryRequest } from "@/services/http/transaction";
import { TransactionsSummaryResponse } from "@/services/http/transaction/types";
import { NewTransactionModal } from "../NewTransactionModal";
import { ButtonComponent } from "../Button";
import { useTransactionContext } from "@/contexts/TransactionsContext";
import { CardSkeleton } from "./Card/CardSkeleton";
import { UserSkeleton } from "./UserMenu/UserSkeleton";

interface SummaryCard {
  title: string;
  icon: string;
  value: number;
}

export const HomeHeader = () => {
  const { user } = useAuthContext();
  const { hasUpdated } = useTransactionContext();
  const [summary, setSummary] = useState<TransactionsSummaryResponse>();
  const [isCardLoaded, setIsCardLoaded] = useState(false);
  const [isMenuLoaded, setIsMenuLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function getSummaryData() {
      if (!user?.id) return;

      const response = await transactionsSummaryRequest(user?.id);

      setSummary(response);
      setIsCardLoaded(true);
      setIsMenuLoaded(false);
    }

    getSummaryData();
  }, [user?.id, hasUpdated]);

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
  ];

  return (
    <>
      <VStack backgroundColor="#121214" justify="space-between" paddingX="8rem">
        <HStack
          display="flex"
          justify="space-between"
          align="center"
          paddingY={4}
          width="100%"
        >
          <ButtonComponent onClick={onOpen} variant="primary">
            Nova Transação
          </ButtonComponent>
          <Image src="/dtmoney-logo.svg" alt="DT Money Logo" />
          {summary && isCardLoaded ? (
            <UserMenu name={user?.name} email={user?.email} />
          ) : (
            <UserSkeleton isLoaded={isMenuLoaded} />
          )}
        </HStack>
        <HStack
          marginTop={-14}
          top={16}
          position="relative"
          width="100%"
          justify="space-between"
          spacing={6}
        >
          {summary && isCardLoaded ? (
            <>
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
            </>
          ) : (
            <CardSkeleton isLoaded={isCardLoaded} />
          )}
        </HStack>
      </VStack>

      <NewTransactionModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
