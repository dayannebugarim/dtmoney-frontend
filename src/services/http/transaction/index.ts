import {
  CreateCategoryParams,
  CreateTransactionParams,
  EditTransactionParams,
  ListCategoriesParams,
  ListCategoriesResponse,
  SearchTransactionParams,
  SearchTransactionResponse,
  TransactionsSummaryResponse,
} from "./types";
import api from "@/services/api";

export const transactionsSummaryRequest = async (userId: string) => {
  const { data: response } = await api.get(`/transaction/summary/${userId}`);
  return response as TransactionsSummaryResponse;
};

export const searchTransactionRequest = async ({
  userId,
  description,
  page,
  pageSize,
}: SearchTransactionParams) => {
  const params = { userId, description, page, pageSize };
  const { data: response } = await api.get("/transaction", {
    params,
  });
  return response as SearchTransactionResponse;
};

export const createTransactionRequest = async ({
  userId,
  value,
  type,
  description,
  categoryId,
}: CreateTransactionParams) => {
  const { data: response } = await api.post(`/transaction`, {
    userId,
    value,
    type,
    description,
    categoryId,
  });
  return response as { id: string };
};

export const listCategoriesRequest = async ({
  userId,
}: ListCategoriesParams) => {
  const params = { userId };
  const { data: response } = await api.get("/transaction/category", {
    params,
  });
  return response as ListCategoriesResponse[];
};

export const editTransactionRequest = async ({
  id,
  value,
  type,
  description,
  categoryId,
}: EditTransactionParams) => {
  const { data: response } = await api.put(`/transaction/${id}`, {
    value,
    type,
    description,
    categoryId,
  });
  return response as { message: string };
};

export const deleteTransactionRequest = async (id: string) => {
  const { data: response } = await api.delete(`/transaction/${id}`);
  return response as { message: string };
};

export const createCategoryRequest = async ({
  userId,
  name,
}: CreateCategoryParams) => {
  const { data: response } = await api.post(`/transaction/category`, {
    userId,
    name,
  });
  return response as { id: string };
};
