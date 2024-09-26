import { List } from "@/components/List";
import { Search } from "@/components/Search";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTransactionContext } from "@/contexts/TransactionsContext";
import { searchTransactionRequest } from "@/services/http/transaction";
import { SearchTransactionResponse } from "@/services/http/transaction/types";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface MainSectionProps {}

export const MainSection = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<SearchTransactionResponse[]>(
    []
  );
  const [description, setDescription] = useState<string>();
  const { hasUpdated } = useTransactionContext();

  useEffect(() => {
    async function getTransactionsData() {
      if (!user?.id) return;

      const response = await searchTransactionRequest({
        userId: user?.id,
        page: 1,
        pageSize: 10,
        description,
      });

      setTransactions(response);
    }

    getTransactionsData();
  }, [user?.id, description, hasUpdated]);

  return (
    <>
      <Box width="60vw">
        <Search setDescription={setDescription} />
        <List data={transactions} />
      </Box>
    </>
  );
};
