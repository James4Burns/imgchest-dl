import { Image } from "./Image";

export type Post = {
  id: string;
  title: string;
  username: string;
  privacy: string;
  report_status: number;
  views: number;
  nsfw: number;
  image_count: number;
  created: string;
  images: Image[];
};
