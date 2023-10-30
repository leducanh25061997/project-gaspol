/**
 *
 * Asynchronously loads the component for MemberInformation
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MemberInformation = lazyLoad(
  () => import('./index'),
  module => module.default,
);
