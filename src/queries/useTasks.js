import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

const getTasks = () => axiosInstance.get("/tasks", null);

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await getTasks();
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 5000,
    gcTime: 10000,
    refetchInterval: 5000,
  });
};
