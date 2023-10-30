/**
 *
 * Asynchronously loads the component for MemberJoinClubDetail
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MemberJoinClubDetail = lazyLoad(
  () => import('./index'),
  module => module.default,
);
