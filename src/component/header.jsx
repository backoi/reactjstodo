import React from "react";
class Header extends React.Component {
  constructor() {
    super();
    this.state = { newTodo: "" };
  }
  handleInputChange = (value) => {
    this.setState({
      newTodo: value,
    });
  };
  handleAddTodo = () => {
    console.log("add");
    if (this.state.newTodo.trim() === "") {
      return;
    }
    const todo = {
      id: Date.now(),
      text: this.state.newTodo,
      completed: false,
    };
    this.props.addNewTodo(todo);
    this.setState({
      newTodo: "",
    });
  };
  render() {
    //console.log(this.props.handleAddTodo);
    return (
      <div>
        <h3 className="text-4xl text-red-700 text-center mb-4">todos</h3>
        <div className="flex p-4 bg-white shadow-md">
          {this.props.todos.length > 0 && (
            <span
              onClick={this.props.handleToggleAll}
              className="absolute px-2 text-black rotate-90"
            >
              ❯
            </span>
          )}
          <input
            className="pl-10 border-none focus:outline-none bg-white"
            value={this.state.newTodo}
            onChange={(e) => this.handleInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.handleAddTodo();
              }
            }}
            placeholder="What needs to be done?"
            type="text"
          />
        </div>
      </div>
    );
  }
}
export default Header;
