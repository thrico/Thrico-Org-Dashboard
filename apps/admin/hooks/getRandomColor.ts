export const getRandomColor = (index: number): string => {
  const seed = index * 137; // 137 is a prime to spread values
  const hue = seed % 360;
  const saturation = 60 + (seed % 20); // 60–79%
  const lightness = 80 + (seed % 10); // 80–89%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
