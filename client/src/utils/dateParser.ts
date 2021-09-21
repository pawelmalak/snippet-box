import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Return {
  formatted: string;
  relative: string;
}

export const dateParser = (date: Date): Return => {
  dayjs.extend(relativeTime);

  const parsedDate = dayjs(date);
  const formatted = parsedDate.format('YYYY-MM-DD HH:mm');
  const relative = parsedDate.fromNow();

  return { formatted, relative };
};
