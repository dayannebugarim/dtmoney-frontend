import { SearchTransactionResponse } from "@/services/http/transaction/types";
import { createContext, useContext, useState } from "react";

const TransactionContext = createContext<any>(null);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<SearchTransactionResponse[]>([]);

  const addTransaction = (transaction: SearchTransactionResponse) => {
    setTransactions(prev => [...prev, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
