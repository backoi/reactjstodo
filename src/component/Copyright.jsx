import React from "react";

class Copyright extends React.Component {
  render() {
    const { colors } = this.props;

    return (
      <div
        className={`mt-10 text-center ${colors.text} opacity-70 transition-colors duration-300`}
      >
        <p>Double-click to edit a todo</p>
        <p>
          Created by{" "}
          <a
            className="hover:underline text-indigo-500 dark:text-indigo-400"
            href="https://github.com/backoi"
          >
            BacKoi
          </a>
        </p>
        <p>
          Powered by{" "}
          <a
            className="hover:underline text-indigo-500 dark:text-indigo-400"
            href="https://vitejs.dev"
            target="_blank"
            rel="noreferrer"
          >
            Vite
          </a>{" "}
          +{" "}
          <a
            className="hover:underline text-indigo-500 dark:text-indigo-400"
            href="https://reactjs.org"
            target="_blank"
            rel="noreferrer"
          >
            React
          </a>
        </p>
      </div>
    );
  }
}
export default Copyright;
