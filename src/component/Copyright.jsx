import React from "react";
class Copyright extends React.Component {
  render() {
    return (
      <div className="mt-10  text-center">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="https://github.com/backoi">BacKoi</a>
        </p>
        <p>
          Powered by{" "}
          <a href="https://vitejs.dev" target="_blank">
            Vite
          </a>{" "}
          +{" "}
          <a href="https://reactjs.org" target="_blank">
            React
          </a>
        </p>
      </div>
    );
  }
}
export default Copyright;
