import page from "@/app/page";
import {
  CreateTransactionParams,
  ListCategoriesParams,
  ListCategoriesResponse,
  SearchTransactionParams,
  SearchTransactionResponse,
  TransactionsSummaryResponse,
} from "./types";
import api from "@/services/api";

export const transactionsSummaryRequest = async (
  userId: string,
  token: string
) => {
  const { data: response } = await api.get(`/transaction/summary/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response as TransactionsSummaryResponse;
};

export const searchTransactionRequest = async ({
  userId,
  description,
  page,
  pageSize,
  token,
}: SearchTransactionParams) => {
  const params = { userId, description, page, pageSize };
  const { data: response } = await api.get("/transaction", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response as SearchTransactionResponse[];
};

export const createTransactionRequest = async ({
  userId,
  value,
  type,
  description,
  categoryId,
  token,
}: CreateTransactionParams) => {
  const { data: response } = await api.post(
    `/transaction`,
    {
      userId,
      value,
      type,
      description,
      categoryId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response as { id: string };
};

export const listCategoriesRequest = async ({
  userId,
  token,
}: ListCategoriesParams) => {
  const params = { userId };
  const { data: response } = await api.get("/transaction/category", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response as ListCategoriesResponse[];
};