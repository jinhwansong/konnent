export interface PageParams {
  page?: number;
  limit?: number;
  q?: string;
  sort?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    sort?: string;
  };
}

export function simulateLatency<T>(data: T, delay = 600): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
  });
}

