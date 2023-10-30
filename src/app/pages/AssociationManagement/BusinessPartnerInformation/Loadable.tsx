import { lazyLoad } from 'utils/loadable';

export const BusinessPartnerInformation = lazyLoad(
  () => import('./index'),
  module => module.default,
);
