import { List } from "@/components/List";
import { Pagination } from "@/components/Pagination";
import { Search } from "@/components/Search";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTransactionContext } from "@/contexts/TransactionsContext";
import { searchTransactionRequest } from "@/services/http/transaction";
import { Transaction } from "@/services/http/transaction/types";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface MainSectionProps {}

export const MainSection = () => {
  const { user } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [description, setDescription] = useState<string>();
  const { hasUpdated } = useTransactionContext();

  useEffect(() => {
    async function getTransactionsData(page: number) {
      if (!user?.id) return;

      const { transactions, totalPages } = await searchTransactionRequest({
        userId: user?.id,
        page: currentPage,
        pageSize: 5,
        description,
      });

      setTransactions(transactions);
      setTotalPages(totalPages);
    }

    getTransactionsData(currentPage);
  }, [user?.id, description, hasUpdated, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Box width="60vw"  mt="6rem">
        <Search setDescription={setDescription} />
        <List data={transactions} />

        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </Box>
    </>
  );
};
