const colors = ["purple", "blue", "magenta", "green"];

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
