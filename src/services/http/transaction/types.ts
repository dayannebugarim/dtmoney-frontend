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
}

export interface Transaction {
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

export interface SearchTransactionResponse {
  transactions: Transaction[]
  totalPages: number
}

export interface CreateTransactionParams {
  userId: string;
  value: number;
  type: string;
  description: string;
  categoryId?: string | null;
}

export interface ListCategoriesParams {
  userId: string;
}

export interface ListCategoriesResponse {
  id: string;
  name: string;
}

export interface EditTransactionParams {
  id: string;
  value?: number;
  type?: string;
  description?: string;
  categoryId?: string;
}

export interface CreateCategoryParams {
  userId: string;
  name: string;
}