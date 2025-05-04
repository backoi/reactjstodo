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
    //console.log(this.props.listTodos);
    const { todos, togleFilter, filter, handleClearCompleted } = this.props;
    return (
      todos.length > 0 && ( //this.state.filterList
        <div className="flex justify-between mt-4 w-full ">
          <div className="text-gray-500">
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
                      ? " border-red-600"
                      : "border-transparent"
                  } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2 `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div
            onClick={handleClearCompleted}
            className="text-black hover:underline cursor-pointer"
          >
            Clear completed
          </div>
        </div>
      )
    );
  }
}
export default Footer;
