/**
 *
 * Asynchronously loads the component for MerchantRequests
 *
 */

import { lazyLoad } from 'utils/loadable';

export const MerchantRequests = lazyLoad(
  () => import('./index'),
  module => module.MerchantRequests,
);
