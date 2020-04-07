import { format } from 'date-fns';

export default function dateFormat(date) {
  return format(new Date(date), 'dd/MM/yyyy');
}
