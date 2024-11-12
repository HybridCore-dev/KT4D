export interface Props {
  count: number;
  page?: number;
  onChange?(page: number): void;
}
