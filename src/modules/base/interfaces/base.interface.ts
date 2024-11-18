export interface IBaseControllerOptions {
  excludedFields?: string[];
  defaultInclude?: Record<string, any>;
  searchFields?: string[];
}

export interface IBaseResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
  meta?: Record<string, any>;
} 