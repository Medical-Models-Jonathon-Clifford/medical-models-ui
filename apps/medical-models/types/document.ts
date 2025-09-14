export type Document = {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  modifiedDate: Date;
  body: string;
  creator: string;
  state: string;
  creatorFullName: string;
};

export type DocumentNode = {
  id: string;
  title: string;
  createdDate: Date;
  modifiedDate: Date;
  children: DocumentNode[];
};
