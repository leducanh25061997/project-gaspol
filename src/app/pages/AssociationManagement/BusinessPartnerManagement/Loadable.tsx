import { lazyLoad } from 'utils/loadable';

export const BusinessPartnerManagement = lazyLoad(
  () => import('./index'),
  module => module.default,
);
