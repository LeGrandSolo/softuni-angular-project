export type Course = {
  createdAt: string;
  description: string;
  imageUrl: string;
  name: string;
  creator: { objectId: string };
  objectId: string;
  topics: [];
};
