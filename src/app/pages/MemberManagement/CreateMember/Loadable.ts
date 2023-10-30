/**
 *
 * Asynchronously loads the component for CreateMember
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CreateMember = lazyLoad(
  () => import('./index'),
  module => module.CreateMember,
);
