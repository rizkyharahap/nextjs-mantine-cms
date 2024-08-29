export interface Response<T> {
  data: T;
  success: boolean;
}

export interface ErrorResponse {
  data: {
    code: number;
    message: string;
  };
  success: false;
}

export interface PaginationResponse<T> extends Response<T> {
  pagination: {
    page: number;
    page_size: number;
    total_page: number;
  };
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
}
