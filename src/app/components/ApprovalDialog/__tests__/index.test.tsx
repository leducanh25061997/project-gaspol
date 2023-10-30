import * as React from 'react';
import { render } from '@testing-library/react';

import { ApprovalDialog } from '..';

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

describe('<ApprovalDialog  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ApprovalDialog open description="test" />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
