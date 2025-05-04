import React from "react";
class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingTodo: null,
    };
    this.editInputRef = React.createRef();
  }
  handleEditTodo = (id) => {
    const todoToEdit = this.props.todos.find((todo) => todo.id == id);
    console.log(todoToEdit);
    this.setState(
      {
        editingTodo: todoToEdit,
      },
      () => {
        // Delay nhỏ để đảm bảo input đã render
        setTimeout(() => {
          this.editInputRef.current?.focus();
        }, 0);
      }
    );
  };
  handleEditTextChange = (e) => {
    this.setState({
      editingTodo: {
        ...this.state.editingTodo,
        text: e.target.value,
      },
    });
  };
  handleUpdate = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    console.log("gia tri", this.state.editingTodo);
    const newList = this.props.todos.map((todo) =>
      todo.id == this.state.editingTodo.id
        ? { ...todo, text: this.state.editingTodo.text }
        : todo
    );
    this.setState({
      editingTodo: null,
    });
    this.props.handleUpdate(newList);
  };
  togleStatus = (id) => {
    const updatedTodos = this.props.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.props.togleStatus(updatedTodos);
  };
  handleCancelEdit = () => {
    this.setState({
      editingTodo: null,
    });
  };
  // handleClickOutSide=(e)=>{
  //   if(this.editInputRef.current.contains(e.target)){
  //     this.setState({
  //       editingTodo:null
  //     })
  //   }
  // }
  render() {
    const { todo } = this.props;
    const { editingTodo } = this.state;
    return (
      <div className="relative">
        <label
          className={`absolute left-5 top-1/2 -translate-y-1/2 ${
            editingTodo ? "invisible" : "flex"
          }  items-center z-10 
           
          }`}
        >
          <input
            type="checkbox"
            onChange={() => this.togleStatus(todo.id)}
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
        <div
          onDoubleClick={() => !editingTodo && this.handleEditTodo(todo.id)}
          className={`flex group relative w-full h-full items-center justify-between p-4 border-b ${
            todo.completed ? "bg-green-100" : "bg-white"
          }`}
        >
          {editingTodo && editingTodo.id === todo.id ? (
            <input
              ref={this.editInputRef} // Gán ref cho input
              value={editingTodo.text}
              onChange={this.handleEditTextChange}
              onKeyDown={this.handleUpdate}
              type="text"
              onBlur={this.handleCancelEdit}
              className="w-full h-full px-10 focus:border-red-600 focus:outline-none"
            />
          ) : (
            <div className="todoitem flex items-center">
              <span className={`ml-10 ${todo.completed ? "line-through" : ""}`}>
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
      </div>
    );
  }
}
export default TodoItem;
