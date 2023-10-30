import { lazyLoad } from 'utils/loadable';

export const ClubAssociationInformation = lazyLoad(
  () => import('./index'),
  module => module.default,
);
