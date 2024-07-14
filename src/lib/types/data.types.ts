export type StaticDataType = {
  title: string;
  content?: string | any[];
  description?: string;
  page?: {
    path: string;
    title: string;
    button: string;
  };
};