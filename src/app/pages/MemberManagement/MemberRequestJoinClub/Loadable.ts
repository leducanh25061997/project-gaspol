/**
 *
 * Asynchronously loads the component for MemberRequestJoinClub
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MemberRequestJoinClub = lazyLoad(
  () => import('./index'),
  module => module.default,
);
