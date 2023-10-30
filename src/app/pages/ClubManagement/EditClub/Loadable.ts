/**
 *
 * Asynchronously loads the component for EditClub
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EditClub = lazyLoad(
  () => import('./index'),
  module => module.EditClub,
);
