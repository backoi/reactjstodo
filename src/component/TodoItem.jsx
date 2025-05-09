import React from "react";
class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingTodo: null,
    };
  }

  handleEditTodo = () => {
    const { todos, todo } = this.props;
    const todoToEdit = todos.find((td) => td.id == todo.id);
    this.setState({
      editingTodo: todoToEdit,
    });
  };

  handleEditTextChange = (e) => {
    const { editingTodo } = this.state;
    const text = e.target.value;
    this.setState({
      editingTodo: {
        ...editingTodo,
        text,
      },
    });
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
  handleDeleteTodo = () => {
    const { handleDeleteTodo } = this.props;
    const { todo } = this.props;
    handleDeleteTodo(todo.id);
  };
  toggleStatus = () => {
    const { toggleStatus } = this.props;
    const { todo } = this.props;
    toggleStatus(todo.id);
  };
  handleEditNew = () => {
    const { todo, handleEditNew } = this.props;
    handleEditNew(todo);
  };
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
            onChange={this.toggleStatus}
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
          //onDoubleClick={!editingTodo ? this.handleEditTodo : undefined}
          className={`flex group relative w-full h-full items-center justify-between p-4 border-b ${
            todo.completed ? "bg-green-100" : "bg-white"
          }`}
        >
          {editingTodo?.id === todo.id ? (
            <input
              autoFocus
              value={editingTodo.text}
              onChange={this.handleEditTextChange}
              //onKeyDown={this.handleUpdate}
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
                onClick={this.handleEditNew}
                className="text-gray-500 text-4xl absolute ml-2 hidden group-hover:block right-10 hover:text-[#c18585]"
              >
                sửa
              </button>
              <button
                onClick={this.handleDeleteTodo}
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
