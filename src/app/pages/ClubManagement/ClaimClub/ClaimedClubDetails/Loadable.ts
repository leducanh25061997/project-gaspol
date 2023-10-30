/**
 *
 * Asynchronously loads the component for ClubManagement
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ClaimClubDetails = lazyLoad(
  () => import('./index'),
  module => module.default,
);
