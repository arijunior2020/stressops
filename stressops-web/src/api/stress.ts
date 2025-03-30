import axios from "axios";
import { StressInput, StressResult } from "../types/stress";

const API_BASE = "https://stressops-fn.azurewebsites.net/api";

export const calcularStress = async (
  input: StressInput
): Promise<StressResult> => {
  const response = await axios.post(`${API_BASE}/stresscalculator`, input);
  return response.data;
};

export const getStressList = async (): Promise<StressResult[]> => {
  const response = await axios.get(`${API_BASE}/stresslist`);
  return response.data;
};
