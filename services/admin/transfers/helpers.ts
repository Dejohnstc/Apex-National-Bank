import type { SortOrder } from "mongoose";

import type {
  SortOrder as TransferSortOrder,
  TransferSortField,
} from "./types";

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationResult {
  skip: number;
  limit: number;
}

export interface SortOptions {
  sortBy: TransferSortField;
  sortOrder: TransferSortOrder;
}

export function buildPagination({
  page,
  limit,
}: PaginationOptions): PaginationResult {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

  return {
    skip: (safePage - 1) * safeLimit,
    limit: safeLimit,
  };
}

export function buildSort({
  sortBy,
  sortOrder,
}: SortOptions): Record<string, SortOrder> {
  return {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };
}

export function buildPaginationResponse(
  total: number,
  page: number,
  limit: number
) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}