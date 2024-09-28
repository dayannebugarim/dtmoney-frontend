import { List } from "@/components/List";
import { Pagination } from "@/components/List/Pagination";
import { Search } from "@/components/Search";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTransactionContext } from "@/contexts/TransactionsContext";
import { searchTransactionRequest } from "@/services/http/transaction";
import { Transaction } from "@/services/http/transaction/types";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const MainSection = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [description, setDescription] = useState<string>();
  const [isLoaded, setIsLoaded] = useState(false);
  const { hasUpdated } = useTransactionContext();

  useEffect(() => {
    async function getTransactionsData(page: number) {
      if (!user?.id) return;

      const { transactions, totalPages } = await searchTransactionRequest({
        userId: user?.id,
        page: currentPage,
        pageSize: 8,
        description,
      });

      setTransactions(transactions);
      setTotalPages(totalPages);
      setIsLoaded(true);
    }

    getTransactionsData(currentPage);
  }, [user?.id, description, hasUpdated, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box
        width={{
          "2xl": "65%",
          lg: "65%",
          md: "100%",
          sm: "100%",
          base: "100%",
        }}
        // border="1px"
        // borderColor="red"
      >
        <Search setDescription={setDescription} />
        <List data={transactions} isLoaded={isLoaded} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  );
};
