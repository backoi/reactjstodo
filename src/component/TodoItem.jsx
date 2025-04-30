import React from "react";
class TodoItem extends React.Component {
  render() {
    return this.props.isEditing && this.props.editingTodo.id === todo.id ? (
      <input
        value={this.props.editingText}
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
            onChange={() => this.props.handleToggleComplete(todo.id)}
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
        <span className={`ml-2 ${todo.completed ? "line-through" : ""}`}>
          {todo.text}
        </span>
        <button
          onClick={() => this.props.handleDeleteTodo(todo.id)}
          className="text-gray-500 text-4xl ml-2 absolute hidden group-hover:block right-0 hover:text-[#c18585]"
        >
          ×
        </button>
      </div>
    );
  }
}
export default TodoItem;
