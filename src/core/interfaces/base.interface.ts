type TOrder = "asc" | "desc";

export interface IBaseControllerOptions {
  excludedFields?: string[];
  defaultInclude?: any;
  searchFields?: string[];
  customSort?: { field: string; order: TOrder };
}

export interface IBaseResponse {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
  meta?: Record<string, any>;
}
