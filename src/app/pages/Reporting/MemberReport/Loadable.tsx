import { lazyLoad } from 'utils/loadable';

export const MemberReport = lazyLoad(
  () => import('./index'),
  module => module.default,
);
