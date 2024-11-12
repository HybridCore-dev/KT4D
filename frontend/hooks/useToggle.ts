import React from 'react';

export default function useToggle(defaultValue: boolean) {
  const [isOpen, setIsOpen] = React.useState(defaultValue);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    state: {
      isOpen,
    },
    action: {
      open,
      close,
      toggle,
    },
  };
}
