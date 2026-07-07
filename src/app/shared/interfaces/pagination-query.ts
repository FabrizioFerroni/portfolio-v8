export interface PaginacionQuery {
  page: number;
  limit: number;
  search?: string | null;
}

export interface PaginacionProjectQuery {
  page: number;
  limit: number;
  search?: string | null;
  category?: string | null;
  visibility?: string | null;
  technologies?: string[] | [];
}

export interface PaginationProjectHomeQuery {
  category: string;
}

export interface PaginationAuditQuery extends PaginacionQuery {
  actions?: string | null;
  time?: string | null;
}
