export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map((el) => Number(el));
  return hours * 60 + minutes;
};
