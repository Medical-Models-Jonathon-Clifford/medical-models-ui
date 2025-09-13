import { CommentNode } from '../features/comments/utils/comments';
import { addMinutes } from 'date-fns';

export const newTestCommentNode = (
  createdDateStr = '04 Mar 2010 00:12:00 GMT'
): CommentNode => {
  const createdDate: Date = new Date(Date.parse(createdDateStr));
  const modifiedDate: Date = addMinutes(createdDate, 2);
  return {
    comment: {
      id: '1',
      documentId: '10',
      creator: '1',
      fullName: 'Col. Sherman T. Potter',
      body: 'Test comment',
      createdDate: createdDate,
      modifiedDate: modifiedDate,
      profilePicturePath: '/users/picture/spotter.png'
    },
    children: [],
  };
};

export class CommentNodeBuilder {
  commentNode: CommentNode;

  constructor() {
    this.commentNode = newTestCommentNode();
  }

  id(id: string) {
    this.commentNode.comment.id = id;
    return this;
  }

  document_id(document_id: string) {
    this.commentNode.comment.documentId = document_id;
    return this;
  }

  body(body: string) {
    this.commentNode.comment.body = body;
    return this;
  }

  createdDate(createdDate: Date) {
    this.commentNode.comment.createdDate = createdDate;
    return this;
  }

  modifiedDate(modifiedDate: Date) {
    this.commentNode.comment.modifiedDate = modifiedDate;
    return this;
  }

  children(children: CommentNode[]) {
    this.commentNode.children = children;
    return this;
  }

  build(): CommentNode {
    return this.commentNode;
  }
}
