import React from 'react';
import { render, screen } from '@testing-library/react';
import { CommentPanel } from './CommentPanel';

describe('CommentPanel', () => {
  it('should display the count of comments', () => {
    const { baseElement } = render(<CommentPanel documentId={'1'} />);

    expect(baseElement).toBeTruthy();
    expect(screen.getByTestId('comment-panel-count')).toBeInTheDocument();
  });
});
