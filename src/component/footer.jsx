import React from "react";
import { TODO_STATUS } from "../App";

class Footer extends React.Component {
  render() {
    const option = [
      {
        label: "All",
        key: TODO_STATUS.ALL,
      },
      {
        label: "Active",
        key: TODO_STATUS.ACTIVE,
      },
      {
        label: "Completed",
        key: TODO_STATUS.COMPLETED,
      },
    ];
    //console.log("footer render");
    const { todos, togleFilter, filter, handleClearCompleted, colors } =
      this.props;

    return (
      todos.length > 0 && (
        <div
          className={`flex justify-between mt-4 w-full ${colors.text} transition-colors duration-300`}
        >
          <div className="opacity-70">
            {todos.filter((todo) => !todo.completed).length} item left
          </div>
          <div className="flex space-x-3">
            {option?.map((item, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => togleFilter(item.key)}
                  className={`${
                    filter == item.key
                      ? colors.buttonActive
                      : "border-transparent"
                  } rounded-sm px-2 cursor-pointer hover:border-opacity-60 hover:border-indigo-400 border-2 transition-colors duration-300`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div
            onClick={handleClearCompleted}
            className={` hover:underline cursor-pointer transition-colors duration-300`}
          >
            Clear completed
          </div>
        </div>
      )
    );
  }
}
export default Footer;
