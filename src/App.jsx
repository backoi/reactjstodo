//checkbox
{
  /* <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" class="peer hidden">
  <span class="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-teal-500">
    <svg class="w-4 h-4 text-teal-500 hidden peer-checked:block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
</label> */
}

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useContext,
} from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Main from "./component/Main";
import Copyright from "./component/Copyright";
import { ThemeContext } from "./component/ThemeContext";
import { getTodos } from "./DataFake";
import api from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleAll,
  updateTodo,
  deleteTodo,
  toggleTodo,
  setFilter,
  clearCompleted,
  setTodos,
  setCurrentPage,
} from "./store/todoSlice";
export const TODO_STATUS = {
  ALL: "all",
  COMPLETED: "completed",
  ACTIVE: "active",
};

//refactor code es6, tách provider, HOC cho scroll load more
const App = () => {
  // const [todos, setTodos] = useState([]);
  // const [filter, setFilter] = useState(TODO_STATUS.ALL);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // const [pageSize, setPageSize] = useState(4);
  //const [headerEditFunction, setHeaderEditFunction] = useState(null);
  const dispatch = useDispatch();
  const { todos, filter, currentPage, pageSize } = useSelector(
    (state) => state.todos
  );
  const filteredTodos = useSelector((state) => {
    switch (state.todos.filter) {
      case TODO_STATUS.ACTIVE:
        return state.todos.todos.filter((todo) => !todo.completed);
      case TODO_STATUS.COMPLETED:
        return state.todos.todos.filter((todo) => todo.completed);
      default:
        return state.todos.todos;
    }
  });
  const { theme, setTheme } = useContext(ThemeContext);
  const [colors, setColors] = useState({
    light: {
      background: "bg-gray-100",
      text: "text-black",
      todoBackground: "bg-white",
      todoCompleted: "bg-green-50",
      buttonActive: "border-blue-600",
      pagination: "bg-blue-100",
      paginationActive: "bg-blue-500 text-white",
      headerText: "text-blue-700",
    },
    dark: {
      background: "bg-gray-900",
      text: "text-white",
      todoBackground: "bg-gray-800",
      todoCompleted: "bg-emerald-900",
      buttonActive: "border-indigo-500",
      pagination: "bg-gray-700",
      paginationActive: "bg-indigo-600 text-white",
      headerText: "text-indigo-400",
    },
  });

  const headerRef = useRef(null);

  // const handleAddTodo = async (text) => {
  //   try {
  //     setIsLoading(true);
  //     const newTodo = { title: text, completed: false };
  //     const res = await api.addTodo(newTodo);
  //     fetchData();
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };
  const handleAddTodoRedux = (text) => {
    dispatch(addTodo(text));
  };
  const handleToggleAllRedux = () => {
    dispatch(toggleAll());
  };
  const handleUpdateTodoRedux = (listUpdate) => {
    dispatch(updateTodo(listUpdate));
  };
  const handleDeleteTodoRedux = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleToggleStatusRedux = (id) => {
    dispatch(toggleTodo(id));
  };
  const handleTogleFilterRedux = (filter) => {
    dispatch(setFilter(filter));
  };
  const handleClearCompletedRedux = () => {
    dispatch(clearCompleted());
  };
  const handleLoadMoreRedux = (newData) => {
    dispatch(setTodos([...todos, ...newData]));
    dispatch(setCurrentPage(currentPage + 1));
  };
  const handleEditTodoRedux = (todo) => {
    if (headerRef.current) {
      headerRef.current.handleEditingTodo(todo);
    }
  };
  const getData = async () => {
    const res = await getTodos(currentPage, pageSize, filter);
    return res;
  };

  // const handleToggleAll = () => {
  //   const completedAll = todos.every((todo) => todo.completed);
  //   const updateTodos = todos.map((todo) => ({
  //     ...todo,
  //     completed: !completedAll,
  //   }));
  //   setTodos(updateTodos);
  // };

  // const getData = async () => {
  //   const res = await api.getMore(pageSize, 4 * currentPage, filter);
  //   return res.todos;
  // };

  // const handleUpdateTodo = async (listUpdate) => {
  //   const res = await api.updateTodo(listUpdate);
  //   //setTodos(res.todos);
  //   fetchData();
  // };

  // const handleDeleteTodo = async (id) => {
  //   try {
  //     setIsLoading(true);
  //     const res = await api.deleteTodo(id);
  //     setTodos(todos.filter((todo) => todo.id !== id));
  //     //fetchData();
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);
  //   }
  // };

  // const handleClearCompleted = async () => {
  //   const activeTodos = todos.filter((todo) => !todo.completed);
  //   console.log("activeTodos", activeTodos);
  //   if (activeTodos.length < 4) {
  //     const newData = await getTodos(
  //       currentPage,
  //       pageSize - activeTodos.length,
  //       filter
  //     );
  //     setTodos([...activeTodos, ...newData]);
  //     setCurrentPage(currentPage + 1);
  //   } else {
  //     setTodos(activeTodos);
  //   }
  // };
  // xử lý clear completed
  // const newClearCompleted = async () => {
  //   const todosCompleted = todos.filter((todo) => todo.completed);
  //   const ids = todosCompleted.map((todo) => todo.id);
  //   const res = await api.clearCompleted(ids);
  //   console.log("res", res);
  //   setTodos(todos.filter((todo) => !todo.completed));
  //   //fetchData();
  // };

  // const handleToggleStatus = async (id) => {
  //   console.log("toggle", id);
  //   const todo = todos.find((todo) => todo.id === id);
  //   const res = await api.updateTodo(id, { completed: !todo.completed });
  //   console.log("res", res);
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //     )
  //   );
  //   //fetchData();
  // };

  // const handleTogleFilter = async (filter) => {
  //   setFilter(filter);
  //   const res = await api.getAll();
  //   if (filter === TODO_STATUS.ALL) {
  //     setTodos(res.todos);
  //   } else {
  //     const data = res.todos.filter(
  //       (todo) => todo.completed === (filter === TODO_STATUS.COMPLETED)
  //     );
  //     setTodos(data);
  //   }
  //   setCurrentPage(1);
  // };

  // const handleEditTodo = (todo) => {
  //   if (headerRef.current) {
  //     headerRef.current.handleEditingTodo(todo);
  //   }
  //   // if (headerEditFunction) {
  //   //   headerEditFunction(todo);
  //   // }
  // };
  // const handleLoadMore = (newData) => {
  //   setTodos([...todos, ...newData]);
  //   setCurrentPage(currentPage + 1);
  // };
  //console.log("todos", todos);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getTodos(currentPage, pageSize, filter);
      dispatch(setTodos(res));
      dispatch(setCurrentPage(currentPage + 1));
      // const res = await api.getAll();
      // const data = res.todos.slice(0, 4);
      // dispatch(setTodos(data));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   getData().then((data) => {
  //     setTodos(data);
  //     setCurrentPage(currentPage + 1); //set currentPage=2 ở state
  //   });
  //   fetchData();
  // }, []);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`${colors[theme]?.background} min-h-screen transition-colors duration-300`}
    >
      <div
        className={`flex flex-col max-w-[550px] mx-auto min-h-screen ${colors[theme]?.background} ${colors[theme]?.text} transition-colors duration-300`}
      >
        <Header
          ref={headerRef}
          todos={todos}
          handleUpdateTodo={handleUpdateTodoRedux}
          colors={colors[theme]}
          addNewTodo={handleAddTodoRedux}
          handleToggleAll={handleToggleAllRedux}
          //onEditTodo={setHeaderEditFunction}
        />
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <Main
              todos={filteredTodos}
              filter={filter}
              getData={getData}
              handleLoadMore={handleLoadMoreRedux}
              handleUpdateTodo={handleUpdateTodoRedux}
              handleEditTodo={handleEditTodoRedux}
              colors={colors[theme]}
              handleDeleteTodo={handleDeleteTodoRedux}
              handleToggleStatus={handleToggleStatusRedux}
            />
          </>
        )}

        <div className="flex justify-center mt-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              checked={theme === "dark"}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-blue-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
            <span className={`ml-3 text-sm font-medium ${colors[theme]?.text}`}>
              {theme === "light" ? "Light Mode" : "Dark Mode"}
            </span>
          </label>
        </div>
        <Footer
          todos={todos}
          filter={filter}
          togleFilter={handleTogleFilterRedux}
          handleClearCompleted={handleClearCompletedRedux}
          colors={colors[theme]}
        />
        <div className="space-x-2 self-center mt-3">
          <Copyright colors={colors[theme]} />
        </div>
      </div>
    </div>
  );
};

export default App;
