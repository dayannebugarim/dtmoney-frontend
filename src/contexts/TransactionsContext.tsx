import { createContext, useContext, useState } from "react";

interface TransactionContextData {
  hasUpdated: boolean;
  setHasUpdated: (value: boolean) => void;
}

const TransactionContext = createContext<TransactionContextData | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasUpdated, setHasUpdated] = useState(false);

  return (
    <TransactionContext.Provider value={{ hasUpdated, setHasUpdated }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactionContext must be used within a TransactionProvider");
  }
  return context;
};
