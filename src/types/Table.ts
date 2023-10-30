export interface TableHeaderProps {
  id: string;
  label: string | React.ReactElement;
  align?: 'right' | 'left' | 'center' | 'inherit' | 'justify';
  icon?: any;
  isShow?: boolean;
  width?: number | string;
  hasSort?: boolean;
  disable?: boolean;
  style?: any;
  isHide?: boolean;
}

export interface FilterData {
  name: string;
  value: string;
  checked?: boolean;
}

export interface FilterList {
  name: string;
  data: FilterData[];
  title: string;
  checked?: string;
  status?: string[];
  packageCode?: string[];
  packageType?: string[];
  enrollmentType?: string[];
}
