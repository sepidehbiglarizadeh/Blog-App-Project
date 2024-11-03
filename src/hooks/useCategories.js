import { getCategoryApi } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryApi,
  });
}
