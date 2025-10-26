export type CommentNodeData = {
  id: string;
  documentId: string;
  creator: string;
  body: string;
  fullName: string;
  createdDate: Date;
  modifiedDate: Date;
  profilePicturePath: string;
};

export type CommentNode = {
  comment: CommentNodeData;
  children: CommentNode[];
};
