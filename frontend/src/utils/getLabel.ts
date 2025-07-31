export const getLabel = (
  value: string,
  options: { label: string; value: string }[],
): string => {
  return options.find((opt) => opt.value === value)?.label ?? value;
};
