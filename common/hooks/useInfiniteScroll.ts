import { useEffect } from "react";
import { useCallback, useState } from "react";

import { DataPage } from "@models/datapage";

const useInfiniteScroll = <T, F>(
  getData: (filters?: F, skip?: number) => Promise<DataPage<T>>,
  initialFilters: F
) => {
  const [allDataPage, setAllDataPage] = useState<DataPage<T>>({
    data: [],
    hasMore: true,
  });
  const [error, setError] = useState<any>(null);

  const [filters, setFilters] = useState<F>(initialFilters);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = useCallback(async () => {
    if (!allDataPage.hasMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const result = await getData(filters, allDataPage.data.length);
      setAllDataPage((existingDataPage) => ({
        data: [...existingDataPage.data, ...result.data],
        hasMore: result.hasMore,
      }));
    } catch (ex) {
      setError(ex);
    }

    setIsLoadingMore(false);
  }, [allDataPage, filters]);

  const refresh = useCallback(
    async (filtersArg?: F) => {
      setIsRefreshing(true);
      setError(null);

      try {
        const result = await getData(filtersArg ?? filters, 0);
        setAllDataPage(result);
      } catch (ex) {
        setError(ex);
      }

      setIsRefreshing(false);
    },
    [filters]
  );

  const applyFilters = useCallback(async (filters: F) => {
    setFilters(filters);
    refresh(filters);
  }, []);

  return {
    data: allDataPage.data,
    hasMore: allDataPage.hasMore,
    error,
    filters,
    applyFilters,
    isLoadingMore,
    loadMore,
    isRefreshing,
    refresh,
  };
};

export default useInfiniteScroll;
