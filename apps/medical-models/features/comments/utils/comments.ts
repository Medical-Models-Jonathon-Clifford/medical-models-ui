import { compareAsc } from 'date-fns';

export type CommentNodeData = {
  id: string;
  document_id: string;
  body: string;
  createdDate: Date;
  modifiedDate: Date;
};

export type CommentNode = {
  comment: CommentNodeData;
  children: CommentNode[];
};

export type WholeCommentState = 'Reloading' | 'TopLevelComment' | 'Editing';

export const EMPTY_COMMENT = '';

export function countComments(comments: CommentNode[]): number {
  return comments.reduce(countCommentsReducer, 0);
}

function countCommentsReducer(
  previousValue: number,
  currentValue: CommentNode
): number {
  return previousValue + 1 + countComments(currentValue.children);
}

export function deleteCommentNode(
  toDelete: CommentNode,
  comments: CommentNode[]
): CommentNode[] {
  const startingLen = comments.length;
  let initialFiltered = comments.filter((comment) => comment !== toDelete);
  const filteredLen = initialFiltered.length;
  if (startingLen === filteredLen) {
    // recurse
    initialFiltered = initialFiltered.map((filtered) => {
      filtered.children = deleteCommentNode(toDelete, filtered.children);
      return filtered;
    });
    return initialFiltered;
  } else {
    return initialFiltered;
  }
}

export const compareComments = (a: CommentNode, b: CommentNode): number => {
  return compareAsc(a.comment.createdDate, b.comment.createdDate);
};
