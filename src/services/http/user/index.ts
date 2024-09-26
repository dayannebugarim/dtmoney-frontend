import { CreateUserParams } from "./types";
import api from "@/services/api";

export const createUserRequest = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  const { data: response } = await api.post(`/user`, {
    name,
    email,
    password,
  });
  return response as { id: string };
};
