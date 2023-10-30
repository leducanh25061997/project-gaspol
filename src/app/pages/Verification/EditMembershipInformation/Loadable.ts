/**
 *
 * Asynchronously loads the component for EditIndividualRequestDetail
 *
 */

import { lazyLoad } from 'utils/loadable';

export const EditMembershipInformation = lazyLoad(
  () => import('./index'),
  module => module.EditMembershipInformation,
);
