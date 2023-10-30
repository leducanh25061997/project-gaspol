/**
 *
 * Asynchronously loads the component for CreateMember
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EditAssociation = lazyLoad(
  () => import('./index'),
  module => module.EditAssociation,
);
