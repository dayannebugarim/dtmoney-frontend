export interface TransactionsSummaryResponse {
  totalIncome: number;
  totalExpense: number;
  total: number;
}

export interface SearchTransactionParams {
  userId: string;
  description?: string;
  page?: number;
  pageSize?: number;
  token: string;
}

export interface SearchTransactionResponse {
  id: string;
  category: {
    id: string | null;
    name: string | null;
  };
  goal: {
    id: string | null;
    name: string | null;
  };
  date: string;
  value: number;
  description: string;
  type: "Income" | "Expense";
}

export interface CreateTransactionParams {
  userId: string;
  value: number;
  type: string;
  description: string;
  categoryId?: string | null;
  token: string;
}

export interface ListCategoriesParams {
  userId: string;
  token: string;
}

export interface ListCategoriesResponse {
  id: string;
  name: string;
}
