// The dateTimeUpdated field is important because comments will be editable
export type CommentNode = {
  uuid: string;
  text: string;
  author: string;
  dateTimeAdded: Date;
  dateTimeUpdated: Date;
  replies: CommentNode[];
}

export function countComments(comments: CommentNode[]): number {
  return comments.reduce(countCommentsReducer, 0);
}

function countCommentsReducer(previousValue: number, currentValue: CommentNode): number {
  return previousValue + 1 + countComments(currentValue.replies);
}

export function addReplyToCommentNodes(reply: string, parentComment: CommentNode, comments: CommentNode[]): CommentNode[] {
  return comments.map((comment) => {
    if (comment === parentComment) {
      if (!alreadyAdded(reply, comment.replies)) {
        comment.replies = comment.replies.concat({
          uuid: crypto.randomUUID(),
          text: reply,
          author: 'User',
          dateTimeAdded: new Date(),
          dateTimeUpdated: new Date(),
          replies: []
        });
      }
    } else if (comment.replies) {
      comment.replies = addReplyToCommentNodes(reply, parentComment, comment.replies);
    }
    return comment;
  });
}

export function editCommentNode(newText: string, editedComment: CommentNode, comments: CommentNode[]) {
  return comments.map((comment) => {
    if (comment === editedComment) {
      comment.text = newText;
      comment.dateTimeUpdated = new Date();
    } else if (comment.replies) {
      comment.replies = editCommentNode(newText, editedComment, comment.replies);
    }
    return comment;
  });
}

function alreadyAdded(reply: string, comments: CommentNode[]): boolean {
  return comments.some(comment => comment.text === reply);
}


export function deleteCommentNode(toDelete: CommentNode, comments: CommentNode[]): CommentNode[] {
  const startingLen = comments.length;
  let initialFiltered = comments.filter(comment => comment !== toDelete);
  const filteredLen = initialFiltered.length;
  if (startingLen === filteredLen) {
    // recurse
    initialFiltered = initialFiltered.map(filtered => {
      filtered.replies = deleteCommentNode(toDelete, filtered.replies);
      return filtered;
    });
    return initialFiltered
  } else {
    return initialFiltered;
  }
}
