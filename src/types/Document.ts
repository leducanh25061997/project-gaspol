import { string } from 'yup/lib/locale';

export interface Document {
  name?: string;
  url: string;
  file?: File;
  type?: string;
  uploadedUrl?: string;
}
