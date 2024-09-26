"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import { TransactionProvider } from "@/contexts/TransactionsContext";
import { useAuth } from "@/hooks/useAuth";
import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  useAuth();

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <TransactionProvider>{children}</TransactionProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
