import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

const fetchUserInfo = async (telegramId) => {
  if (!telegramId) throw new Error("Telegram ID is required");
  const response = await axiosInstance.post("/user/info", {
    telegram_id: telegramId,
  });
  return response.data;
};

export const useUserInfo = (telegramId) => {
  return useQuery({
    queryKey: ["userInfo", telegramId],
    queryFn: async () => {
      if (telegramId) {
        const response = await fetchUserInfo(telegramId);
        return response;
      }
    },
    refetchOnWindowFocus: true,
    staleTime: 5000,
    gcTime: 10000,
    refetchInterval: 5000,
    enabled: !!telegramId,
  });
};
