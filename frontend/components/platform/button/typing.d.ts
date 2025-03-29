export interface Props {
  href?: string;
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "inherit" | "white" | "yellow";
  size?: "medium" | "small" | "large" | "tiny";
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  scroll?: boolean;
  title?: string;
  name?: string;
  value?: any;
  autoFocus?: boolean;
  onClick?(event?: MouseEvent<HTMLButtonElement>): void;
}
