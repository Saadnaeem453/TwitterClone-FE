import { useQuery } from "@tanstack/react-query";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.error) return null;
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      return data;
    },
    retry: false,
  });
};
