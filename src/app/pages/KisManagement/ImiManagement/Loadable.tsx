/**
 *
 * Asynchronously loads the component for MemberManagement
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ImiManagement = lazyLoad(
  () => import('./index'),
  module => module.default,
);
