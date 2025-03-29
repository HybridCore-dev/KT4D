export interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick?(): void;
}
