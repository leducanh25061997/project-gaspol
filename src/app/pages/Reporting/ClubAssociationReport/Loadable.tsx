import { lazyLoad } from 'utils/loadable';

export const ClubAssociationReport = lazyLoad(
  () => import('./index'),
  module => module.default,
);
