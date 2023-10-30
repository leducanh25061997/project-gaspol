import * as React from 'react';
import { render } from '@testing-library/react';

import { Logo } from '..';

describe('<Logo  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<Logo />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
