import * as React from 'react';
import { render } from '@testing-library/react';

import { AlertDialog } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<AlertDialog  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<AlertDialog open description="test" />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
