export interface Props {
  href?: string;
  variant?: "primary" | "white" | "yellow";
  size?: "medium" | "small" | "large";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?(): void;
}
