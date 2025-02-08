import { differenceInDays, format, formatDistanceToNow } from 'date-fns';

export const formatTimeSince = (date: Date) => {
  const diffInDays = differenceInDays(new Date(), date);
  if (diffInDays >= 1) {
    return format(date, 'dd MMM yyyy');
  } else {
    return formatDistanceToNow(date, { addSuffix: true });
  }
};
