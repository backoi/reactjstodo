import React from "react";
class Header extends React.Component {
  constructor() {
    super();
    this.state = { newTodo: "" };
  }
  handleInputChange = (e) => {
    this.setState({
      newTodo: e.target.value,
    });
  };
  handleAddTodo = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    if (this.state.newTodo.trim() === "") {
      return;
    }
    const todo = {
      id: Date.now(),
      text: this.state.newTodo,
      completed: false,
    };
    const newList = [todo, ...this.props.todos];
    this.props.addNewTodo(newList);
    this.setState({
      newTodo: "",
    });
  };
  handleToggleAll = () => {
    const completedAll = this.props.todos.every((todo) => todo.completed);
    console.log(completedAll);
    const updateTodos = this.props.todos.map((todo) => ({
      ...todo,
      completed: !completedAll,
    }));
    this.props.handleToggleAll(updateTodos);
  };
  render() {
    //console.log(this.props.handleAddTodo);
    const { newTodo } = this.state;
    const { todos } = this.props;
    return (
      <div>
        <h3 className="text-4xl text-red-700 text-center mb-4">todos</h3>
        <div className="flex p-4 bg-white shadow-md">
          {todos.length > 0 && (
            <span
              onClick={this.handleToggleAll}
              className="absolute px-2 text-black rotate-90"
            >
              ❯
            </span>
          )}
          <input
            className="pl-10 border-none focus:outline-none bg-white"
            value={newTodo}
            onChange={this.handleInputChange}
            onKeyDown={this.handleAddTodo}
            placeholder="What needs to be done?"
            type="text"
          />
        </div>
      </div>
    );
  }
}
export default Header;
