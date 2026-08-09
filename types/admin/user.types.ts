export interface AdminUser {
  id: string;
  customerId: string;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  accountType: string;
 emailStatus: string;
  phoneStatus: string;
  twoFactorEnabled: boolean;
  failedLoginAttempts: number;
  lastLogin: string | null;
  createdAt: string;
}

export interface GetUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  role?: string;
  accountType?: string;
  sort?: "newest" | "oldest" | "lastLogin";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetUsersResponse {
  success: boolean;
  data: AdminUser[];
  pagination: Pagination;
}