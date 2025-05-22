import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

const Header = forwardRef(
  ({ todos, handleToggleAll, colors, addNewTodo, handleUpdateTodo }, ref) => {
    const [inputText, setInputText] = useState("");
    const [editingTodo, setEditingTodo] = useState(null);
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      handleEditingTodo: (todo) => {
        console.log("todohd", todo);
        setEditingTodo(todo);
        setInputText(todo.text);
        inputRef.current.focus();
      },
    }));

    const handleInputChange = (e) => {
      const text = e.target.value;
      setInputText(text);
    };

    const handleSubmit = (e) => {
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
        setEditingTodo(null);
      } else {
        // Add new todo
        addNewTodo(inputText);
      }

      setInputText("");
    };

    return (
      <div>
        <h3 className={`text-4xl ${colors?.headerText} text-center mb-4`}>
          todos
        </h3>
        <div
          className={`flex p-4 ${colors?.todoBackground} shadow-md transition-colors duration-300`}
        >
          {todos.length > 0 && (
            <span
              onClick={handleToggleAll}
              className={`absolute px-2 ${colors?.text} rotate-90 cursor-pointer`}
            >
              ❯
            </span>
          )}
          <input
            ref={inputRef}
            autoFocus
            className={`pl-10 border-none focus:outline-none ${colors?.todoBackground} ${colors?.text} transition-colors duration-300 w-full`}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleSubmit}
            placeholder={editingTodo ? "Edit todo" : "What needs to be done?"}
            type="text"
          />
        </div>
      </div>
    );
  }
);

export default Header;
