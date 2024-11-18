export interface IBaseControllerOptions {
  excludedFields?: string[];
  defaultInclude?: any;
  searchFields?: string[];
}

export interface IBaseResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
  meta?: Record<string, any>;
}
