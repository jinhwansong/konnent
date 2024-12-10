export const formatDate = (isoDate: string): string => {
  return isoDate.substring(0, 10).replace(/-/g, '.');
};
