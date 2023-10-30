/**
 *
 * Asynchronously loads the component for CreateClub
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CreateClub = lazyLoad(
  () => import('./index'),
  module => module.CreateClub,
);
