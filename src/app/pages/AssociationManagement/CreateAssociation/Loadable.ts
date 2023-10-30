/**
 *
 * Asynchronously loads the component for CreateMember
 *
 */

import { lazyLoad } from 'utils/loadable';

export const CreateAssociation = lazyLoad(
  () => import('./index'),
  module => module.CreateAssociation,
);
