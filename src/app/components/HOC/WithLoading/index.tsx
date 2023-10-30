/**
 *
 * WithLoading
 *
 */
import * as React from 'react';

import AppProgress from 'app/components/AppProgress';

export function withLoading(WrappedComponent: React.ElementType) {
  function HOC(props: any) {
    const [loading, setLoading] = React.useState(false);

    return (
      <>
        {loading && <AppProgress />}
        <WrappedComponent {...props} setLoading={setLoading} />
      </>
    );
  }
  return HOC;
}
