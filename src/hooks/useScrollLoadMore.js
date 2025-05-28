import { useState, useRef, useEffect, useCallback } from "react";

const useScrollLoadMore = (
  getData,
  handleLoadMore,
  pageSize = 4,
  loadDelay = 1000
) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await getData();
      console.log("newData", newData);

      if (!newData || newData.length === 0) {
        setLoading(false);
        setHasMore(false);
        return;
      }

      handleLoadMore(newData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading more data:", error);
      setLoading(false);
      setHasMore(false);
    }
  }, [hasMore, loading, getData, handleLoadMore]);

  const handleScroll = useCallback(
    (e) => {
      const container = e.target;
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        !loading &&
        hasMore
      ) {
        loadMore();
      }
    },
    [loading, hasMore, loadMore]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return {
    containerRef,
    loading,
    hasMore,
  };
};

export default useScrollLoadMore;
