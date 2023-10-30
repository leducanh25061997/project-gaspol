export interface FileUpload {
  url: string;
  key: string;
}
export interface ParamsUpload {
  fileNames: string[];
}
export interface ParamsUrl {
  name: string;
  url: string;
  files: any;
  key: string;
}
export interface ResponseUrl {
  name: String;
  url: String;
}
export interface ResponseError {
  response?: Response;
}
export interface Response {
  status: number;
  message: string;
  data: {
    messages: string[];
  };
}
