import React from "react";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", editingTodo: null };
    this.inputRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update when relevant props/state change
    const { todos, editingTodo, colors } = this.props;
    const { inputText } = this.state;
    return (
      nextProps.todos !== todos ||
      nextProps.editingTodo !== editingTodo ||
      nextProps.colors !== colors ||
      nextState.inputText !== inputText
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
    const { editingTodo } = this.props;
    // Update input text when editingTodo changes
    if (prevProps.editingTodo?.id !== editingTodo?.id) {
      this.setState({
        inputText: editingTodo?.text || "",
      });
      this.inputRef.current?.focus();
    }
  }

  render() {
    //console.log("Header rendered");
    const { todos, handleToggleAll, colors } = this.props;
    const { inputText, editingTodo } = this.state;

    return (
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
            placeholder={editingTodo ? "Edit todo" : "What needs to be done?"}
            type="text"
          />
        </div>
      </div>
    );
  }
}
export default Header;
