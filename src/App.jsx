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
import Footer from "./component/Footer";
import Header from "./component/Header";
import Main from "./component/Main";
import Copyright from "./component/Copyright";

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
  addNewTodo = (todo) => {
    this.setState({
      todos: [todo, ...this.state.todos],
    });
  };
  handleInputChange = (value) => {
    this.setState({
      newTodo: value,
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
        console.log("vao all");
        return this.state.todos;
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
    const updateTodos = this.state.todos.filter((todo) => !todo.completed);
    this.setState({
      todos: updateTodos,
      filter: "all",
    });
  };
  handleUpdateTodo = (id, text) => {
    const update = this.state.todos.map((todo) =>
      todo.id == id ? { ...todo, text } : todo
    );
    this.setState({
      todos: update,
    });
  };

  togleFilter = (filter) => {
    this.setState({
      filter,
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
          <Header
            todos={this.state.todos}
            addNewTodo={this.addNewTodo}
            handleInputChange={this.handleInputChange}
            handleToggleAll={this.handleToggleAll}
          />

          <div className="flex flex-col items-center justify-center mt-4">
            <Main
              listTodos={listTodos}
              handleDeleteTodo={this.handleDeleteTodo}
              handleUpdateTodo={this.handleUpdateTodo}
              handleToggleComplete={this.handleToggleComplete}
            />

            <Footer
              todos={this.state.todos}
              filter={this.state.filter}
              togleFilter={this.togleFilter}
              handleClearCompleted={this.handleClearCompleted}
            />
            <Copyright />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
