import React from 'react';
import { render } from '@testing-library/react';

import { AddComment } from './AddComment';

const testOnSaveNewComment = jest.fn();

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AddComment onSave={testOnSaveNewComment} />
    );
    expect(baseElement).toBeTruthy();
    expect(testOnSaveNewComment).toBeCalledTimes(0);
  });
});
