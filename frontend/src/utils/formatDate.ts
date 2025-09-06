import { format } from 'date-fns';

export const formatDate = (day: string) => {
  return format(new Date(day), 'yy.MM.dd');
};
