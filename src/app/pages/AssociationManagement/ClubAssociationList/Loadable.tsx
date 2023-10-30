import { lazyLoad } from 'utils/loadable';

export const ClubAssociationManagement = lazyLoad(
  () => import('./index'),
  module => module.default,
);
