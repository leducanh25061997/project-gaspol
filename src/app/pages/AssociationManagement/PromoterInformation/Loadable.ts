/**
 *
 * Asynchronously loads the component for ClubInformation
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ClubInformation = lazyLoad(
  () => import('./index'),
  module => module.default,
);
