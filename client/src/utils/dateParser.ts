import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';

interface Return {
  formatted: string;
  relative: string;
}

export const dateParser = (date: Date): Return => {
  dayjs.extend(relativeTime);
  dayjs.extend(customParseFormat);

  // test date format
  const regex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.|\+|-|Z)+/;
  const dateFormat = regex.test(date.toString())
    ? 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
    : 'YYYY-MM-DD HH:mm:ss.SSS Z';

  // parse date
  const parsedDate = dayjs(date, dateFormat);
  const formatted = parsedDate.format('YYYY-MM-DD HH:mm');
  const relative = parsedDate.fromNow();

  return { formatted, relative };
};
