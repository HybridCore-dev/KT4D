export interface OptionType {
  value: string | number;
  text: string;
}

export interface Props {
  value?: string | number;
  options: OptionType[];
  placeholder?: string;
  label?: string;
  onChange?(value: string | number): void;
}
