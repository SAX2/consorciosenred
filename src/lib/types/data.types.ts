import { StaticImageData } from "next/image";

export type StaticDataType = {
  title: string;
  content?: string | any[];
  description?: string;
  page?: {
    path: string;
    title: string;
    button: string;
    mainColor?: string;
  };
};

export type ServicesStatic = {
  pill: string;
  title: string;
  description: string;
  items: { icon?: React.ReactElement, title?: string }[];
  image: StaticImageData;
  mainColor?: string;
}