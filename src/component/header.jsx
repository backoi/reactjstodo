import React from "react";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: props.editingTodo?.text || "" };
    this.inputRef = React.createRef();
  }
  handleInputChange = (e) => {
    const text = e.target.value;
    this.setState({
      inputText: text,
    });
  };
  handleSubmit = (e) => {
    const { addNewTodo, editingTodo, todos, handleUpdateTodo } = this.props;
    const { inputText } = this.state;
    if (e.key !== "Enter") {
      return;
    }
    if (inputText.trim() === "") {
      return;
    }
    if (editingTodo) {
      const newList = todos.map((tod) =>
        tod.id == editingTodo.id ? { ...tod, text: inputText } : tod
      );

      return handleUpdateTodo(newList);
    }
    addNewTodo(inputText);
    this.setState({
      inputText: "",
    });
  };
  componentDidUpdate(prevProps) {
    // Khi nhận prop editingTodo mới, cập nhật inputValue
    if (prevProps.editingTodo?.id !== this.props.editingTodo?.id) {
      this.inputRef.current?.focus();
      this.setState({ inputText: this.props.editingTodo?.text || "" });
    }
  }

  render() {
    const { todos, handleToggleAll } = this.props;
    return (
      <div>
        <h3 className="text-4xl text-red-700 text-center mb-4">todos</h3>
        <div className="flex p-4 bg-white shadow-md">
          {todos.length > 0 && (
            <span
              onClick={handleToggleAll}
              className="absolute px-2 text-black rotate-90"
            >
              ❯
            </span>
          )}
          <input
            ref={this.inputRef}
            autoFocus
            className="pl-10 border-none focus:outline-none bg-white"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            onKeyDown={this.handleSubmit}
            placeholder="What needs to be done?"
            type="text"
          />
        </div>
      </div>
    );
  }
}
export default Header;
