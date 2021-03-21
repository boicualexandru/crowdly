import { useEffect } from "react";
import { useCallback, useState } from "react";

import { DataPage } from "@models/datapage";

const useInfiniteScroll = <T, F>(
  getData: (filters?: F, after?: T) => Promise<DataPage<T>>,
  initialFilters?: F | undefined
) => {
  const [allDataPage, setAllDataPage] = useState<DataPage<T>>({
    data: [],
    hasMore: true,
  });
  const [error, setError] = useState<any>(null);

  const [filters, setFilters] = useState(initialFilters);

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
      const result = await getData(
        filters,
        allDataPage.data?.[allDataPage.data.length - 1]
      );
      setAllDataPage((existingDataPage) => ({
        data: [...existingDataPage.data, ...result.data],
        hasMore: result.hasMore,
      }));
    } catch (ex) {
      setError(ex);
    }

    setIsLoadingMore(false);
  }, [allDataPage, filters]);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);

    try {
      const result = await getData(filters);
      setAllDataPage(result);
    } catch (ex) {
      setError(ex);
    }

    setIsRefreshing(false);
  }, [filters]);

  const applyFilters = useCallback(async (filters: F) => {
    setFilters(filters);
    refresh();
  }, []);

  return {
    data: allDataPage.data,
    hasMore: allDataPage.hasMore,
    error,
    applyFilters,
    isLoadingMore,
    loadMore,
    isRefreshing,
    refresh,
  };
};

export default useInfiniteScroll;
