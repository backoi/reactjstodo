import React, { useState, useRef, useEffect, useCallback } from "react";

// Higher Order Component for scroll load more functionality
const withScrollLoadMore = (
  WrappedComponent,
  pageSize = 4,
  loadDelay = 1000
) => {
  return (props) => {
    //const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const containerRef = useRef(null);
    const { todos, getData, handleLoadMore } = props;

    const loadMore = useCallback(async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const newData = await getData();

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

    const handleScroll = (e) => {
      const container = e.target;
      const { scrollTop, scrollHeight, clientHeight } = container;

      if (
        scrollTop + clientHeight >= scrollHeight - 50 &&
        !loading &&
        hasMore
      ) {
        loadMore();
      }
    };

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

    // useEffect(() => {
    //   loadMore();
    // }, []);

    //xử lý việc thay đổi todos, tìm cách thực tế hơn
    // useEffect(() => {
    //   setDisplayTodos([]);
    //   setPage(1);
    //   setHasMore(true);
    //   setLoading(false);

    //   const timer = setTimeout(() => {
    //     const initialData = todos.slice(0, pageSize);
    //     setDisplayTodos(initialData);
    //     setPage(2);
    //   }, 0);

    //   return () => clearTimeout(timer);
    // }, [todos]);

    return (
      <div
        ref={containerRef}
        className="h-[200px] overflow-y-auto border border-gray-200 rounded-md shadow-sm"
        style={{ scrollBehavior: "smooth" }}
      >
        <WrappedComponent {...props} todos={todos} />

        {(loading || (!hasMore && todos.length > 0)) && (
          <div className="flex justify-center py-2 border-t border-gray-200">
            {loading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-t-transparent border-solid rounded-full animate-spin border-blue-500 border-2 mr-2"></div>
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm">
                No more items to load
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
};

export default withScrollLoadMore;
