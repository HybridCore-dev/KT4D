interface DataType {
  url: string;
  text: string;
  children?: DataType[];
}

export const guestMenu: DataType[] = [];

export const memberMenu: DataType[] = [];
