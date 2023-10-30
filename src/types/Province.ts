export interface Province {
  id?: number;
  name?: string;
  ownerId?: number;
  clubNumber?: number;
}
export interface Address {
  id?: number;
  name?: string;
  path?: string;
  parentId?: number;
}

export interface AddressRequest {
  type?: string;
  id?: number;
  provinceId?: number;
  cityId?: number;
  districtId?: number;
  wardId?: number;
  name?: string;
}
