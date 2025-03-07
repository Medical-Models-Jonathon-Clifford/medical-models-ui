import React from 'react';
import { render } from '@testing-library/react';

import Home from '../app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });
});
