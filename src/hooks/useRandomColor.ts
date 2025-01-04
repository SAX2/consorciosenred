import { colorNames, userColors } from '@/lib/contents/(app)/contents';

export const useRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  return colorNames[randomIndex];
}

export const getColor = (color: string) => {
  return userColors.find((c) => c.name === color);
}
