import axios from "axios";
import { FeatureFlag } from "../types";

const api = axios.create({
  baseURL: "/feature-flags",
  timeout: 5000,
});

export const fetchFeatureFlags = async (): Promise<FeatureFlag[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { data } = await api.get<FeatureFlag[]>("");
  return data;
};
export const toggleFeatureFlag = async (
  id: string,
  enabled: boolean,
): Promise<FeatureFlag> => {
  await new Promise((resolve) => setTimeout(resolve, 150));

  const { data } = await api.patch<FeatureFlag>(`/${id}`, { enabled });
  return data;
};
