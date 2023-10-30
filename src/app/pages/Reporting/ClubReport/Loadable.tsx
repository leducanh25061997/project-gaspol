import { lazyLoad } from 'utils/loadable';

export const ClubReport = lazyLoad(
  () => import('./index'),
  module => module.default,
);
