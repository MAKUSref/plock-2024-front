const colors = [
  "processing",
  "success",
  "error",
  "warning",
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
