import { createConfirmation } from 'react-confirm';
import Dialog, { OptionsType } from './dialog';

// create confirm function
const _confirm = createConfirmation(Dialog);

// This is optional. But wrapping function makes it easy to use.
export function confirm(
  title: string,
  description: string,
  options?: OptionsType,
) {
  return _confirm({ title, description, options });
}

export function alert(title: string, message: string) {
  return _confirm({
    title: title,
    description: message,
    options: {
      disableCancelButton: true,
    },
  });
}
