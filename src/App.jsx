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

import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: "1",
          text: "sửa giao diện",
          completed: true,
        },
        {
          id: "2",
          text: "tìm việc mới",
          completed: false,
        },
      ],
      filter: "all",
      newTodo: "",
      isEditing: false,
      editingTodo: null,
      editingText: "",
      isCompleted: false,
    };
  }
  handleAddTodo = () => {
    if (this.state.newTodo.trim() === "") {
      return;
    }
    const todo = {
      id: Date.now(),
      text: this.state.newTodo,
      completed: false,
    };
    this.setState({
      todos: [todo, ...this.state.todos],
      filterList: [...this.state.todos, todo],
      newTodo: "",
    });
  };
  handleEditTodo = (id) => {
    const todoToEdit = this.state.todos.find((todo) => todo.id == id);
    console.log(todoToEdit);
    this.setState({
      isEditing: true,
      editingTodo: todoToEdit,
      editingText: todoToEdit.text,
    });
  };

  handleDeleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };
  //them 1 cai mang sao chep nx
  // handleFilterv2 = (filter) => {
  //   console.log("gia tri cua filter", filter);
  //   switch (filter) {
  //     case "active":
  //       this.setState({
  //         filterList: this.state.todos.filter((todo) => !todo.completed),
  //       });
  //       break;
  //     case "completed":
  //       this.setState({
  //         filterList: this.state.todos.filter((todo) => todo.completed),
  //       });
  //       break;
  //     default:
  //       this.setState({
  //         filterList: [...this.state.todos],
  //       });
  //   }
  // };
  handleFilter = () => {
    switch (this.state.filter) {
      case "active":
        console.log("vao active");
        return this.state.todos.filter((todo) => !todo.completed);
      case "completed":
        console.log("vao completed");
        return this.state.todos.filter((todo) => todo.completed);
      default:
        return [...this.state.todos];
    }
  };
  handleToggleAll = () => {
    const completedAll = this.state.todos.every((todo) => todo.completed);
    console.log(completedAll);
    const updateTodos = this.state.todos.map((todo) => ({
      ...todo,
      completed: !completedAll,
    }));
    this.setState({
      todos: updateTodos,
    });
  };
  handleUpdateTodo = () => {
    const update = this.state.todos.map((todo) =>
      todo.id == this.state.editingTodo.id
        ? { ...todo, text: this.state.editingText }
        : todo
    );
    this.setState({
      isEditing: false,
      todos: update,
      editingText: "",
      editingTodo: null,
    });
  };
  //   // const [newTodo, setNewTodo] = useState("");
  //   // const [isEditing, setIsEditing] = useState(false);
  //   // const [editingTodo, setEditingTodo] = useState(null);
  //   // const [editingText, setEditingText] = useState("");
  //   // const [isCompleted, setIsCompleted] = useState(false);
  //   // const [isLoading, setIsLoading] = useState(false);
  //   // const [error, setError] = useState(null);
  //   // const handleAddTodo = () => {
  //   //   if (newTodo.trim() === "") {
  //   //     return;
  //   //   }
  //   //   const todo = {
  //   //     id: Date.now(),
  //   //     text: newTodo,
  //   //     completed: false,
  //   //   };
  //   //   setTodos([...todos, todo]);
  //   //   setNewTodo("");
  //   // };
  //   // const handleEditTodo = (id) => {
  //   //   const todoToEdit = todos.find((todo) => todo.id === id);
  //   //   setEditingTodo(todoToEdit);
  //   //   setEditingText(todoToEdit.text);
  //   //   setIsEditing(true);
  //   // };
  //   // const handleUpdateTodo = () => {
  //   //   if (editingText.trim() === "") {
  //   //     return;
  //   //   }
  //   //   const updatedTodos = todos.map((todo) =>
  //   //     todo.id === editingTodo.id ? { ...todo, text: editingText } : todo
  //   //   );
  //   //   setTodos(updatedTodos);
  //   //   setEditingTodo(null);
  //   //   setEditingText("");
  //   //   setIsEditing(false);
  //   // };
  //   // const handleDeleteTodo = (id) => {
  //   //   const updatedTodos = todos.filter((todo) => todo.id !== id);
  //   //   setTodos(updatedTodos);
  //   // };
  handleToggleComplete = (id) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.setState({
      todos: updatedTodos,
    });
  };
  //   //   const allCompleted = todos.every((todo) => todo.completed);

  //   //   const updatedTodos = todos.map((todo) => ({
  //   //     ...todo,
  //   //     completed: !allCompleted,
  //   //   }));
  //   //   setTodos(updatedTodos);
  //   // };
  //   // const handleClearCompleted = () => {
  //   //   const updatedTodos = todos.filter((todo) => !todo.completed);
  //   //   setTodos(updatedTodos);
  //   // };
  //   // const handleInputChange = (e) => {
  //   //   setNewTodo(e.target.value);
  //   // };
  //   // const handleEditInputChange = (e) => {
  //   //   setEditingText(e.target.value);
  //   // };
  //   // const handleKeyDown = (e) => {
  //   //   if (e.key === "Enter") {
  //   //     handleAddTodo();
  //   //   }
  //   // };

  //   // const handleCancelEdit = () => {
  //   //   setEditingTodo(null);
  //   //   setEditingText("");
  //   //   setIsEditing(false);
  //   // };
  //   // const handleToggleLoading = () => {
  //   //   setIsLoading(!isLoading);
  //   // };
  //   // const handleToggleError = () => {
  //   //   setError(!error);
  //   // };
  //   // const handleToggleCompleted = () => {
  //   //   setIsCompleted(!isCompleted);
  //   // };
  //   // const handleToggleAllCompleted = () => {
  //   //   const allCompleted = todos.every((todo) => todo.completed);
  //   //   const updatedTodos = todos.map((todo) => ({
  //   //     ...todo,
  //   //     completed: !allCompleted,
  //   //   }));
  //   //   setTodos(updatedTodos);
  //   // };
  handleClearCompleted = () => {
    console.log("click");
    const updateTodos = this.state.todos.filter((todo) => !todo.completed);
    this.setState({
      todos: updateTodos,
    });
  };
  render() {
    //     // const {
    //     //   todos,
    //     //   newTodo,
    //     //   isEditing,
    //     //   editingTodo,
    //     //   editingText,
    //     //   isCompleted,
    //     //   isLoading,
    //     //   error,
    //     // } = this.state;

    const listTodos = this.handleFilter();
    return (
      <div className="">
        <div
          className="flex flex-col max-w-[550px] mx-auto  min-h-screen bg-gray-200
        "
        >
          <h3 className="text-4xl text-red-700 text-center mb-4">todos</h3>
          <div className="flex p-4 bg-white shadow-md">
            {this.state.todos.length > 0 && (
              <span
                onClick={this.handleToggleAll}
                className="absolute px-2 text-black rotate-90"
              >
                ❯
              </span>
            )}
            <input
              className="pl-10 border-none focus:outline-none bg-white"
              value={this.state.newTodo}
              onChange={(e) => this.setState({ newTodo: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.handleAddTodo();
                }
              }}
              placeholder="What needs to be done?"
              type="text"
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            {listTodos.map(
              (
                todo //this.state.filterList
              ) => (
                <div
                  onDoubleClick={() =>
                    !this.state.isEditing && this.handleEditTodo(todo.id)
                  }
                  key={todo.id}
                  className={`flex group relative w-full items-center justify-between p-4 border-b ${
                    todo.completed ? "bg-green-100" : "bg-white"
                  }`}
                >
                  {this.state.isEditing &&
                  this.state.editingTodo.id === todo.id ? (
                    <input
                      value={this.state.editingText}
                      onChange={(e) =>
                        this.setState({
                          editingText: e.target.value,
                        })
                      }
                      onKeyDown={(e) => {
                        if (e.key == "Enter") {
                          this.handleUpdateTodo();
                        }
                      }}
                      type="text"
                      className="p-2 border rounded"
                    />
                  ) : (
                    <div className="todoitem flex items-center">
                      <label className="relative flex items-center">
                        <input
                          type="checkbox"
                          onChange={() => this.handleToggleComplete(todo.id)}
                          checked={todo.completed}
                          className="absolute h-0 w-0 opacity-0"
                        />

                        <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-green-500">
                          {/* Checkmark */}
                          <div
                            className={`w-2 h-3 border-b-2 border-r-2 border-green-500 transform -translate-y-px rotate-45 ${
                              todo.completed ? "block" : "hidden"
                            }`}
                          ></div>
                        </div>
                      </label>
                      <span
                        className={`ml-2 ${
                          todo.completed ? "line-through" : ""
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        onClick={() => this.handleDeleteTodo(todo.id)}
                        className="text-gray-500 text-4xl ml-2 absolute hidden group-hover:block right-0 hover:text-[#c18585]"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
            {listTodos.length > 0 && ( //this.state.filterList
              <div className="flex justify-between mt-4 w-full ">
                <div className="text-gray-500">
                  {this.state.todos.filter((todo) => !todo.completed).length}{" "}
                  item left
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => this.setState({ filter: "all" })}
                    className={`${
                      this.state.filter == "all"
                        ? " border-red-600"
                        : "border-transparent"
                    } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2 `}
                  >
                    All
                  </button>
                  <button
                    onClick={() => this.setState({ filter: "active" })}
                    className={`${
                      this.state.filter == "active"
                        ? " border-red-600"
                        : "border-transparent"
                    } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => this.setState({ filter: "completed" })}
                    className={`${
                      this.state.filter == "completed"
                        ? "border-2 border-red-600"
                        : "border-transparent"
                    } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2  `}
                  >
                    Complated
                  </button>
                </div>
                <div
                  onClick={this.handleClearCompleted}
                  className="text-black hover:underline cursor-pointer"
                >
                  Clear completed
                </div>
              </div>
            )}
            <div className="mt-10">
              <p>Double-click to edit a todo</p>
              <p>
                Created by <a href="https://github.com/backoi">BacKoi</a>
              </p>
              <p>
                Powered by{" "}
                <a href="https://vitejs.dev" target="_blank">
                  Vite
                </a>{" "}
                +{" "}
                <a href="https://reactjs.org" target="_blank">
                  React
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
