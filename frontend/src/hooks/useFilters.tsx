import { useEffect, useState, ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface UseFiltersProps<T> {
  initialFilters: T;
  initialPage: number;
  router: AppRouterInstance;
  debounceTime?: number;
  debouncedFields?: string[];
}

export function useFilters<T extends Record<string, string>>({
  initialFilters,
  initialPage,
  router,
  debounceTime = 300,
  debouncedFields = []
}: UseFiltersProps<T>) {
  const [filters, setFilters] = useState<T>(initialFilters);
  const [currentPage, setCurrentPage] = useState(initialPage);


  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  }, [filters, currentPage, router]);

  
  const handleDebouncedFilter = useDebouncedCallback((name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, debounceTime);

 
  const handleFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    

    if (debouncedFields.includes(name)) {
      handleDebouncedFilter(name, value);
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

 
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    handleFilterChange,
    handleDebouncedFilter,
    handlePageChange
  };
}