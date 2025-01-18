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
