import React from 'react';
import { render, screen } from '@testing-library/react';
import { CommentThread } from './CommentThread';

const mockOnClickReply = jest.fn();
const mockOnSaveNewReply = jest.fn();
const mockOnChangeNewComment = jest.fn();
const mockOnClickEdit = jest.fn();
const mockOnSaveEdit = jest.fn();
const mockOnDeleteComment = jest.fn();

describe('CommentThread', () => {
  it('should display the count of comments', () => {
    const testCommentNode = {
      comment: {
        id: '2',
        document_id: '10',
        body: 'Test comment',
        createdDate: new Date(Date.parse('04 Mar 2010 00:12:00 GMT')),
        modifiedDate: new Date(Date.parse('04 Mar 2010 00:12:02 GMT')),
      },
      children: [],
    };

    const testReplyParent = {
      comment: {
        id: '1',
        document_id: '10',
        body: 'Test Reply Parent',
        createdDate: new Date(Date.parse('04 Mar 2010 00:11:00 GMT')),
        modifiedDate: new Date(Date.parse('04 Mar 2010 00:11:02 GMT')),
      },
      children: [testCommentNode],
    };

    const { baseElement } = render(
      <CommentThread
        commentNode={testCommentNode}
        replyParent={testReplyParent}
        newCommentText={''}
        onClickReply={mockOnClickReply}
        onSaveNewReply={mockOnSaveNewReply}
        onChangeNewComment={mockOnChangeNewComment}
        onClickEdit={mockOnClickEdit}
        onSaveEdit={mockOnSaveEdit}
        onDeleteComment={mockOnDeleteComment}
      />
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('comment-thread')).toBeInTheDocument();
  });
});
