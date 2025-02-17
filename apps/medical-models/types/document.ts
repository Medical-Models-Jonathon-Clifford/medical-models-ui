export type Document = {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  modifiedDate: string;
  body: string;
  creator: string;
  state: string;
};

export type DocumentNode = {
  id: string;
  title: string;
  createdDate: Date;
  modifiedDate: Date;
  children: DocumentNode[];
};
