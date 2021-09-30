import { Color } from '../typescript/types';

export const badgeColor = (language: string): Color => {
  const code = language.toLowerCase().charCodeAt(0);
  let color: Color = 'primary';

  switch (code % 6) {
    case 0:
    default:
      color = 'primary';
      break;
    case 1:
      color = 'success';
      break;
    case 2:
      color = 'info';
      break;
    case 3:
      color = 'warning';
      break;
    case 4:
      color = 'danger';
      break;
    case 5:
      color = 'light';
      break;
  }

  return color;
};
