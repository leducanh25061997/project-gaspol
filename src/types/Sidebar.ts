import { Role } from './Role';

export interface GPRoute {
  title: string;
  path?: string;
  isShow?: boolean;
  component?: any;
  roles?: string[];
  authenticationRequired?: boolean; // default: true
}

export interface GPSidebarMenu extends GPRoute {
  icon?: any;
  children?: GPRoute[];
  visible?: boolean;
  roles?: Role[];
}

export interface GPSidebarSubMenu extends GPSidebarMenu {
  visible?: boolean; // default: false
}
