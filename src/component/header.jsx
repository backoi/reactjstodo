import React from "react";
import { ThemeContext } from "../App";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", editingTodo: null };
    this.inputRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update when relevant props/state change
    return (
      nextProps.todos !== this.props.todos ||
      nextProps.editingTodo !== this.props.editingTodo ||
      nextState.inputText !== this.state.inputText
    );
  }

  setEditingTodo = (todo) => {
    this.setState({
      editingTodo: todo,
      inputText: todo.text,
    });
    this.inputRef.current.focus();
  };

  handleInputChange = (e) => {
    const text = e.target.value;
    this.setState({
      inputText: text,
    });
  };

  handleSubmit = (e) => {
    const { addNewTodo, handleUpdateTodo, todos } = this.props;
    const { inputText, editingTodo } = this.state;

    if (e.key !== "Enter") {
      return;
    }

    if (inputText.trim() === "") {
      return;
    }

    if (editingTodo) {
      // Update existing todo
      const updatedTodos = todos.map((todo) =>
        todo.id === editingTodo.id ? { ...todo, text: inputText } : todo
      );
      handleUpdateTodo(updatedTodos);
    } else {
      // Add new todo
      addNewTodo(inputText);
    }

    this.setState({
      inputText: "",
    });
  };

  componentDidUpdate(prevProps) {
    // Update input text when editingTodo changes
    if (prevProps.editingTodo?.id !== this.props.editingTodo?.id) {
      this.setState({
        inputText: this.props.editingTodo?.text || "",
      });
      this.inputRef.current?.focus();
    }
  }

  render() {
    //console.log("Header rendered");
    const { todos, handleToggleAll, editingTodo } = this.props;
    const { inputText } = this.state;

    return (
      <ThemeContext.Consumer>
        {({ colors }) => (
          <div>
            <h3 className={`text-4xl ${colors.headerText} text-center mb-4`}>
              todos
            </h3>
            <div
              className={`flex p-4 ${colors.todoBackground} shadow-md transition-colors duration-300`}
            >
              {todos.length > 0 && (
                <span
                  onClick={handleToggleAll}
                  className={`absolute px-2 ${colors.text} rotate-90 cursor-pointer`}
                >
                  ❯
                </span>
              )}
              <input
                ref={this.inputRef}
                autoFocus
                className={`pl-10 border-none focus:outline-none ${colors.todoBackground} ${colors.text} transition-colors duration-300 w-full`}
                value={inputText}
                onChange={this.handleInputChange}
                onKeyDown={this.handleSubmit}
                placeholder={
                  editingTodo ? "Edit todo" : "What needs to be done?"
                }
                type="text"
              />
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
export default Header;
