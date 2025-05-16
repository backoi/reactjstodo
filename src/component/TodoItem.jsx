import React from "react";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    const { todo } = this.props;
    return nextProps.todo !== todo;
  }

  handleEditClick = () => {
    const { todo, handleEditTodo } = this.props;
    handleEditTodo(todo);
  };

  // handleDeleteTodo = () => {
  //   const { handleDeleteTodo, todo } = this.props;
  //   handleDeleteTodo(todo.id);
  // };

  toggleStatus = () => {
    const { toggleStatus, todo } = this.props;
    toggleStatus(todo.id);
  };
  // handleEditTodo = () => {
  //   const { handleEditTodo, todo } = this.props;
  //   handleEditTodo(todo);
  // };

  render() {
    const { colors } = this.props;
    const { todo, handleEditTodo } = this.props;
    //console.log("todo", todo);

    return (
      <div className="relative">
        <label className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center z-10">
          <input
            type="checkbox"
            onChange={this.toggleStatus}
            checked={todo.completed}
            className="absolute h-0 w-0 opacity-0"
          />

          <div
            className={`w-5 h-5 border-2 ${
              todo.completed ? "border-indigo-500" : "border-gray-400"
            } rounded-full flex items-center justify-center transition-colors duration-200`}
          >
            {/* Checkmark */}
            <div
              className={`w-2 h-3 border-b-2 border-r-2 border-indigo-500 transform -translate-y-px rotate-45 ${
                todo.completed ? "block" : "hidden"
              }`}
            ></div>
          </div>
        </label>
        <div
          className={`flex group relative w-full h-full items-center justify-between p-4 
 border-b transition-colors duration-300 ${
   todo.completed ? colors.todoCompleted : ""
 }`}
        >
          <div className="todoitem flex items-center">
            <span
              className={`ml-10 ${colors.text} ${
                todo.completed ? "line-through opacity-70" : ""
              } transition-colors duration-300`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleEditTodo(todo)}
              className={`${colors.text} opacity-50 text-xl absolute ml-2 hidden group-hover:block right-10 hover:opacity-100 transition-opacity`}
            >
              sửa
            </button>
            <button
              onClick={this.handleDeleteTodo}
              className={`${colors.text} opacity-50 text-4xl ml-2 absolute hidden group-hover:block right-0 hover:opacity-100 transition-opacity`}
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default TodoItem;
