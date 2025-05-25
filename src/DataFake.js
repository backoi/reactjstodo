export const dataFake = [
  {
    id: "1",
    text: "1 sửa giao diện",
    completed: true,
  },
  {
    id: "2",
    text: "2 học bài react",
    completed: false,
  },
  {
    id: "3",
    text: "3 ra hà nội",
    completed: true,
  },
  {
    id: "4",
    text: "4 chức năng lọc",
    completed: false,
  },
  {
    id: "5",
    text: "5 phân trang",
    completed: true,
  },
  {
    id: "6",
    text: "6 đi chơi",
    completed: false,
  },
  {
    id: "7",
    text: "7 về quê",
    completed: false,
  },
  {
    id: "8",
    text: "8 theme bằng context",
    completed: true,
  },
  {
    id: "9",
    text: "9 refactor code",
    completed: true,
  },
  {
    id: "10",
    text: "10 làm bài tập",
    completed: true,
  },
  {
    id: "11",
    text: "11 phân trang bằng scroll",
    completed: true,
  },
  {
    id: "12",
    text: "12 code splitting",
    completed: false,
  },
  {
    id: "13",
    text: "13 error boundary",
    completed: true,
  },
  {
    id: "14",
    text: "14 high order component",
    completed: false,
  },
  {
    id: "15",
    text: "15 custom hook",
    completed: true,
  },
  {
    id: "16",
    text: "16 portal",
    completed: false,
  },
  {
    id: "17",
    text: "17 search",
    completed: false,
  },
];
export const getTodos = (page = 1, pageSize = 4, filter = "all") => {
  if (filter === "all")
    return dataFake.slice((page - 1) * pageSize, page * pageSize);
  if (filter === "completed")
    return dataFake
      .filter((todo) => todo.completed)
      .slice((page - 1) * pageSize, page * pageSize);
  return dataFake
    .filter((todo) => !todo.completed)
    .slice((page - 1) * pageSize, page * pageSize);
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(dataFake.slice((page - 1) * 4, page * 4));
  //   }, 1000);
  // });
};
