import { parseISO, format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';


export const formatDateInUTC = (dateString, formatStr = 'yyyy-MM-dd') => {
  const date = parseISO(dateString);
  const zonedDate = utcToZonedTime(date, 'UTC');
  return format(zonedDate, formatStr, { timeZone: 'UTC' });
};