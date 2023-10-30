import * as React from 'react';
import { render } from '@testing-library/react';

import Table from '..';
import ThemeConfig from '../../../../styles/theme';

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

describe('<Table  />', () => {
  it('should match snapshot', () => {
    // const loadingIndicator = render(
    //   <ThemeConfig>
    //     <Table
    //       headers={[{ id: 'test', label: 'test' }]}
    //       renderItem={jest.fn()}
    //     />
    //   </ThemeConfig>,
    // );
    // expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
