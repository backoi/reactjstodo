import React from "react";
import useScrollLoadMore from "../hooks/useScrollLoadMore";

const TodoList = ({ todos, getData, handleLoadMore }) => {
  const { containerRef, loading, hasMore } = useScrollLoadMore(
    getData,
    handleLoadMore
  );

  return (
    <div
      ref={containerRef}
      className="h-[200px] overflow-y-auto border border-gray-200 rounded-md shadow-sm"
      style={{ scrollBehavior: "smooth" }}
    >
      {todos.map((todo) => (
        <div key={todo.id} className="p-2 border-b border-gray-200">
          {todo.title}
        </div>
      ))}

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

export default TodoList;
