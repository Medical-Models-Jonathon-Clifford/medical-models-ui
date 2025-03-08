import React from 'react';
import { render } from '@testing-library/react';

import HomePage from '../app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomePage />);
    expect(baseElement).toBeTruthy();
  });
});
