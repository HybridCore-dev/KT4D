export type TSender = "USER" | "APP";

export interface IMessage {
  id: number;
  text: string;
  sender: TSender;
  loading?: boolean;
}

export interface Props {
  messages: Array<IMessage>;
}
