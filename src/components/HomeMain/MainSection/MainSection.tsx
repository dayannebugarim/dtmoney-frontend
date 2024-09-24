import { List } from "@/components/List";
import { Search } from "@/components/Search";
import { useAuthContext } from "@/contexts/AuthContext";
import { searchTransactionRequest } from "@/services/http/transaction";
import { SearchTransactionResponse } from "@/services/http/transaction/types";
import { Box } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

interface MainSectionProps {}

export const MainSection = () => {
  const { user } = useAuthContext();
  const cookies = parseCookies();
  const token = cookies["token"];
  const [transactions, setTransactions] = useState<SearchTransactionResponse[]>(
    []
  );
  const [description, setDescription] = useState<string>();


  useEffect(() => {
    async function getTransactionsData() {
      if (!user?.id || !token) return;

      const response = await searchTransactionRequest({
        userId: user?.id,
        page: 1,
        pageSize: 10,
        description,
        token,
      });

      setTransactions(response);
    }

    getTransactionsData();
  }, [token, user?.id, description]);

  return (
    <>
      <Box width="60vw">
        <Search setDescription={setDescription} />
        <List data={transactions} />
      </Box>
    </>
  );
};
