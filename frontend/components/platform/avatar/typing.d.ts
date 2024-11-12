export interface Props {
  type: "letter" | "image" | "icon";
  title?: string;
  subTitle?: string;
  avatar?: React.ReactNode;
  fullTitle?: boolean;
}
