import React from 'react';
import { render, screen } from '@testing-library/react';
import { Comment } from './Comment';

const mockOnReply = jest.fn();
const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('Comment', () => {
  it('should display body of comment', () => {
    const testCommentNode = {
      comment: {
        id: '1',
        document_id: '10',
        body: 'Test comment',
        createdDate: new Date(Date.parse('04 Mar 2010 00:12:00 GMT')),
        modifiedDate: new Date(Date.parse('04 Mar 2010 00:12:02 GMT')),
      },
      children: [],
    };

    const { baseElement } = render(
      <Comment
        commentNode={testCommentNode}
        onReply={mockOnReply}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('comment-body')).toBeInTheDocument();
    expect(screen.getByTestId('comment-body')).toBeVisible();
  });
});
